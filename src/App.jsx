import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/adminPage.jsx'
import LoginPage from './pages/loginPage.jsx'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './pages/admin/register.jsx'


function App() {
  return (
    <>
      <div>
        <BrowserRouter>
        <Toaster position='top-right'/>
        <Routes path="/*">
          <Route path="/admin/*" element={<AdminPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/" element={<h1>Home</h1>}/>
          <Route path="/*" element={<h1>404 Not Found</h1>} />
          <Route path="/register" element={<RegisterPage/>} />
        </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
