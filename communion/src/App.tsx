import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Community_Group from './components/Community_Group';
import { EnhancedFeaturesShowcase } from './components/enhanced-features-showcase';
import CarouselDialog from './components/ui/CarouselDialog';
import DivineQuotes from './components/ui/DivineQuotes';
import DonationOption from './components/ui/DonationComponent';
import ReligiousEventsCalendar from './components/ui/ReligiousEventsCalendar';
import { Table } from './components/ui/table';
import GroupChat from './components/ui/GroupChat';
// import Register from './components/ui/Register';
import AuthPage from './components/ui/AuthPage';
import HelpAlert from './components/ui/HelpAlert/HelpAlert';
import DonationComponent from './components/ui/DonationComponent';
import Donation from './components/ui/Donation';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<EnhancedFeaturesShowcase />} />
        <Route path="/Community Groups" element={<Community_Group />} />
        <Route path="/Interfaith Events" element={<ReligiousEventsCalendar />} />
        <Route path="/Virtual Tours" element={<CarouselDialog />} />
        <Route path="/Sacred Text Study" element={<DivineQuotes />} />
        <Route path="/Community Service" element={<Donation />} />
        <Route path="/Help And Support" element={<HelpAlert />} />
        <Route path="/chat/:religion/:group" element={<GroupChat />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/authpage" element={<AuthPage />} /> {/* Updated path */}
      </Routes>
      
    </>
  );
}

export default App;
