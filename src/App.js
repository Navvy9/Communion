import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import './App.css';
import Community_Group from './components/Community_Group';
import { EnhancedFeaturesShowcase } from './components/enhanced-features-showcase';
import CarouselDialog from './components/ui/CarouselDialog';
import DivineQuotes from './components/ui/DivineQuotes';
import DonationOption from './components/ui/DonationOption';
import ReligiousEventsCalendar from './components/ui/ReligiousEventsCalendar';
import { Routes, Route } from 'react-router-dom';
import GroupChat from './components/ui/GroupChat';
import Register from './components/ui/Register';
import Login from './components/ui/Login';
import HelpAlert from './components/ui/HelpAlert/HelpAlert';
function App() {
    return (_jsx(_Fragment, { children: _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(EnhancedFeaturesShowcase, {}) }), _jsx(Route, { path: '/Community Groups', element: _jsx(Community_Group, {}) }), _jsx(Route, { path: '/Interfaith Events', element: _jsx(ReligiousEventsCalendar, {}) }), _jsx(Route, { path: '/Virtual Tours', element: _jsx(CarouselDialog, {}) }), _jsx(Route, { path: '/Sacred Text Study', element: _jsx(DivineQuotes, {}) }), _jsx(Route, { path: '/Community Service', element: _jsx(DonationOption, {}) }), _jsx(Route, { path: '/Help And Support', element: _jsx(HelpAlert, {}) }), _jsx(Route, { path: "/chat/:religion/:group", element: _jsx(GroupChat, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) })] }) }));
}
export default App;
