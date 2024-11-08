
import { useEffect } from 'react';
import './App.css'
import Community_Group from './components/Community_Group'
import { EnhancedFeaturesShowcase } from './components/enhanced-features-showcase'
import CarouselDialog from './components/ui/CarouselDialog';
import DivineQuotes from './components/ui/DivineQuotes';
import DonationOption from './components/ui/DonationOption';
import ReligiousEventsCalendar from './components/ui/ReligiousEventsCalendar'
import { Table } from './components/ui/table'
import { Routes,Route } from 'react-router-dom'

import GroupChat from './components/ui/GroupChat';
import Register from './components/ui/Register';
import Login from './components/ui/Login';
import HelpAlert from './components/ui/HelpAlert/HelpAlert';


function App() {
  const RedirectTOExternal: React.FC = ()=>{
    useEffect(()=>{
      window.location.href='https://chat-app-nest.vercel.app/'
    },[]);
    return null;
  }
  

  return (
    <><Routes>
      <Route path='/' element={<EnhancedFeaturesShowcase />}></Route>
      <Route path='/Community Groups' element={<Community_Group/>}></Route>
      <Route path='/Interfaith Events' element={<ReligiousEventsCalendar/>}></Route>
      <Route path='/Virtual Tours' element={<CarouselDialog/>}></Route>
      <Route path='/Sacred Text Study' element={<DivineQuotes/>}></Route>
      <Route path='/Community Service' element={<DonationOption/>}></Route>
      <Route path='/Help And Support' element={<HelpAlert/>}></Route>
      <Route path="/chat/:religion/:group" element={<GroupChat />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      
      
    </Routes>
    {/* < ReligiousEventsCalendar /> */}
    {/* <CarouselDialog/> */}
    {/* <AuthPage/> */}

    {/* <Login />
      < Register /> */}

   

    </>
  )
}

export default App
