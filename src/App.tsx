// src/App.tsx
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import UserList from './pages/UserList';
import AddUser from './pages/AddUser';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/add" element={<AddUser />} />
    </Routes>
  </BrowserRouter>
);

export default App;
