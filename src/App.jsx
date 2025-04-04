import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
// Import Layout components if you want a persistent layout wrapper here
// import Navbar from './components/layout/Navbar';
// import Sidebar from './components/layout/Sidebar';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* You can add persistent Layout Components (Navbar, Sidebar) here
            if they should always be visible outside the specific page content
            handled by AppRoutes. Otherwise, include them within specific pages
            or use a wrapper component inside AppRoutes. */}

        {/* Example:
        <div className="flex">
           <Sidebar /> // If always present when logged in
           <div className="flex-1 flex flex-col">
              <Navbar /> // If always present when logged in
              <main> */}
        <AppRoutes />
        {/*      </main>
            </div>
        </div>
        */}
      </Router>
    </AuthProvider>
  );
}

export default App;