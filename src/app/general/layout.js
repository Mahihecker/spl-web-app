'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import SidePanel from '../../components/SidePanel';
import Footer from '../../components/Footer';

export default function GeneralLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useAuth();
  const sidebarWidth = isSidebarOpen ? '190px' : '55px';
  

  if (!user || user.role !== 'general') {
    return null; // Middleware will redirect
  }

  return (
    <div
      className="d-flex flex-column"
      style={{
        minHeight: '100vh',
        fontFamily: 'Poppins, sans-serif',
        backgroundColor: '#F8F8F8',
        overflowX: 'hidden', // Prevent horizontal scroll
      }}
    >
      <Header placeholder="Search organizations" style={{ zIndex: 2}} />
      <div className="d-flex flex-grow-1">
        <SidePanel
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          userRole={user.role}
          style={{ zIndex: 1 }} // Side panel above banner
        />
        <main
          className="flex-grow-1"
          style={{
            marginLeft: sidebarWidth,
            width: `calc(100% - ${sidebarWidth})`,
            padding: 0,
            overflowY: 'auto',
            transition: 'margin-left 0.3s ease, width 0.3s ease',
          }}
        >
          {children}
        </main>
      </div>
      <Footer style={{ zIndex: 2 }} />
    </div>
  );
}