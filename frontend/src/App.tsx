import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './state/AuthContext';
import { ParcelProvider } from './state/ParcelContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import FindLand from './pages/FindLand';
import Map from './pages/Map';
import Parcel from './pages/Parcel';
import LandPassportPage from './pages/LandPassport';
import Ownership from './pages/Ownership';
import RoR from './pages/RoR';
import Registration from './pages/Registration';
import Mutation from './pages/Mutation';
import Encumbrance from './pages/Encumbrance';
import Planning from './pages/Planning';
import Tax from './pages/Tax';
import Disputes from './pages/Disputes';
import Documents from './pages/Documents';
import Interpretation from './pages/Interpretation';
import Verification from './pages/Verification';
import Services from './pages/Services';
import ServiceRequest from './pages/ServiceRequest';
import Transactions from './pages/Transactions';
import Notifications from './pages/Notifications';
import Acquisition from './pages/Acquisition';
import Profile from './pages/Profile';
import Login from './pages/Login';

export default function App() {
  return (
    <AuthProvider>
      <ParcelProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find" element={<FindLand />} />
            <Route path="/map" element={<Map />} />
            <Route path="/parcel/:id" element={<Parcel />} />
            <Route path="/parcel/:id/passport" element={<LandPassportPage />} />
            <Route path="/parcel/:id/ownership" element={<Ownership />} />
            <Route path="/parcel/:id/ror" element={<RoR />} />
            <Route path="/parcel/:id/registration" element={<Registration />} />
            <Route path="/parcel/:id/mutation" element={<Mutation />} />
            <Route path="/parcel/:id/encumbrance" element={<Encumbrance />} />
            <Route path="/parcel/:id/planning" element={<Planning />} />
            <Route path="/parcel/:id/tax" element={<Tax />} />
            <Route path="/parcel/:id/disputes" element={<Disputes />} />
            <Route path="/parcel/:id/documents" element={<Documents />} />
            <Route path="/parcel/:id/interpretation" element={<Interpretation />} />
            <Route path="/parcel/:id/verify" element={<Verification />} />
            <Route path="/parcel/:id/acquisition" element={<Acquisition />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/request/:serviceType" element={<ServiceRequest />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </ParcelProvider>
    </AuthProvider>
  );
}
