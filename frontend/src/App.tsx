import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './features/dashboard/Dashboard';
import Complaint from './features/complaints/Complaint';
import Login from './features/auth/Login';
import Fundgraph from './features/graph/Fundgraph';
import WalletProfile from './features/wallets/Walletprofile';
import Crosschain from './features/clusters/Crosschain';
import Caseworkspace from './features/cases/Caseworkspace';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Yahan path define ho raha hai */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/" element={<Login />} />
        <Route path="/fundgraph" element={<Fundgraph />} />
        <Route path="/walletprofile" element={<WalletProfile />} />
        <Route path="/crosschain" element={<Crosschain />} />
        <Route path="/caseworkspace" element={<Caseworkspace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;