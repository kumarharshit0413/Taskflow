
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskManager from './components/TaskManager';
import UserListPage from './components/UserListPage';
import ProtectedRoute from './components/ProtectedRoute';
import OAuthRedirect from './components/OAuthRedirect';

function App() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/oauth/redirect" element={<OAuthRedirect />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<TaskManager />} />
        {userInfo && userInfo.isAdmin && (
          <Route path="/admin/userlist" element={<UserListPage />} />
        )}
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;