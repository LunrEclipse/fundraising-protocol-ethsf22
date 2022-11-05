import { Navigate, Route, Routes } from 'react-router-dom'
import Posts from './views/post';
import Profile from './views/profile';
import Home from './views/home';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post' element={<Posts />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
  );
}

export default App;
