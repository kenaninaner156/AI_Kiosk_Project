import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AI from './pages/AI';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const App = () => (
<Router>
<nav className='flex gap-4 p-4 border-b'>
<NavLink to='/' end className={({ isActive }) => (isActive ? 'font-bold' : '')}>Dashboard</NavLink>
<NavLink to='/ai' className={({ isActive }) => (isActive ? 'font-bold' : '')}>AI</NavLink>
<NavLink to='/analytics' className={({ isActive }) => (isActive ? 'font-bold' : '')}>Analytics</NavLink>
<NavLink to='/settings' className={({ isActive }) => (isActive ? 'font-bold' : '')}>Settings</NavLink>
</nav>
<Routes>
<Route path='/' element={<Dashboard />} />
<Route path='/ai' element={<AI />} />
<Route path='/analytics' element={<Analytics />} />
<Route path='/settings' element={<Settings />} />
</Routes>
</Router>
);

export default App;
