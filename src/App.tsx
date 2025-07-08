// src/App.tsx
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Accommodations from './components/Accommodations';
import ProtectedRoute from './components/ProtectedRoute';
import { useLogin } from './hooks/useLogin';
import FindAccommodationByID from './components/Find_a_accommodation_by_ID';
import UpdateAccommodation from './components/Update_an_existing_accomodation';
import StoreNewAccommodation from './components/Store_a_new_accomodation';
import Bookings from './components/Bookings';

function App() {
  const { login } = useLogin();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm onLogin={login} />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accommodations" element={<Accommodations />} />
          <Route path="/find-accommodation" element={<FindAccommodationByID />} />
          <Route path="/update-accommodation" element={<UpdateAccommodation />} />
          <Route path="/store-accommodation" element={<StoreNewAccommodation />} />
          <Route path="/bookings" element={<Bookings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
