import { styled } from 'styled-components'
import nav from '../assets'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserName, selectUserPhoto, setSignOutState, setUserLoginDetails } from '../redux/slice/userSlice'
import { useEffect } from 'react';

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const username = useSelector(selectUserName)
    const userphoto = useSelector(selectUserPhoto)
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user)
                navigate('/home')
            }
        })
    }, [username])
    const handleAuth = () => {
        if (!username) {

            signInWithPopup(auth, provider)
                .then((result) => {
                    // Handle successful sign-in
                    const user = result.user;
                    setUser(user)
                    console.log('User signed in:', user);
                })
                .catch((error) => {
                    // Handle sign-in error
                    console.log('Error signing in:', error);
                });
        } else if (username) {
            auth.signOut().then(() => {
                dispatch(setSignOutState())
                navigate('/')
            })
        }
    };
    const setUser = (user) => {
        dispatch(setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
        }))
    }
    return (
        <Nav>
            <Logo >
                <img src='./images/logo.svg' alt="disney +" />
            </Logo>
            {
                !username ? (<Login onClick={handleAuth}>Login</Login>) :
                    <>
                        <NavMenu>
                            {nav.map((item, key) => (
                                <a href={item.to} key={key}>
                                    <img src={item.src} alt="" />
                                    <span>{item.title}</span>
                                </a>
                            ))}
                        </NavMenu>
                        <Signout>
                            <UserImg src={userphoto} alt={username}></UserImg>
                            <Dropdown>
                                <span onClick={handleAuth}>Sign out</span>
                            </Dropdown>
                        </Signout>
                    </>
            }

        </Nav>
    )
}

const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: #090b13;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`
const Logo = styled.div`
max-height: 70px;
width: 80px;
padding: 0;
margin-top: 4px;
font-size: 0;
display: inline-block;

img{
    display: block;
    width: 100%;
}
`
const NavMenu = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    margin: 0px;
    padding: 0px;
    position: relative;
    margin-right: auto;
    margin-left: 25px;
    /* @media screen and(max-width:768px){
        display: none;
    } */
    a{
        display: flex;
        align-items: center;
        padding: 0 12px;
   
    img{
        height: 20px;
        min-width: 20px;
        width: 20px;
        z-index: auto;
    }
    span{
        color:rgb(249,249,249);
        font-size: 13px;
        letter-spacing: 1.42px;
        line-height: 1.08;
        padding: 2px 0px;
        white-space: nowrap;
        position: relative;
    
    &:before{
        background-color: rgb(249,249,249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: '';
        height: 2px;
        opacity: 0;
        position: absolute;
        left: 0px;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition:  all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        visibility: hidden;
        width: auto;
        }
    }
    &:hover{
        span:before{
            transform: scaleX(1);
            opacity: 1 !important;
            visibility: visible;
        }
    }
}
`
const Login = styled.a`
    background-color: rgba(0,0,0,.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all .2s ease 0s;
    cursor: pointer;
    &:hover{
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`
const UserImg = styled.img`
        height: 100%;
`
const Dropdown = styled.div`
        position:absolute;
        top:48px;
        right: 0px;
        background: rgb(19,19,19);
        border: 1px solid rgba(151,151,151,.34);
        border-radius: 4px;
        box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
        padding: 10px;
        font-size: 14px;
        letter-spacing: 2px;
        width: 100px;
        opacity: 0;
        display: none;
        /* cursor: pointer; */
`
const Signout = styled.div`
        position: relative;
        height: 48px;
        width: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        ${UserImg}{
            border-radius: 50%;
            width: 100%;
            height: 100%;
        }
        &:hover{
            ${Dropdown} {
                opacity: 1;
                display: flex;
                transition-duration: 1s;
            }
        }
`


export default Header
