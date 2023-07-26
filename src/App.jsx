import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Header from './components/Header'
import Home from './components/Home'

function App() {


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' exact element={<Login />} />
        <Route path='/home' exact element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
