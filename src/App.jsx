import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Appoiment from './pages/Appoiment'
import Profile from './pages/Profile'
import PublicProfile from './pages/PublicProfile'
import GarmentDetails from './pages/GarmentDetails'
import CreateGarment from './pages/CreateGarment'
import Login from './pages/Login'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create-garment' element={<CreateGarment/>}/>
        <Route path='/garmen-details' element={<GarmentDetails/>}/>
        <Route path='/appoiment' element={<Appoiment/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/public-profile' element={<PublicProfile/>}/>
        <Route path='/login' element={Login}/>
      </Routes>
    </Router>
  )
}

export default App
