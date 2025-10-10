"use client";

import { useState } from 'react';
import Header from './Header';
import SidePanel from './SidePanel';
import Footer from './Footer';

export default function Layout({ children, placeholder = "Search organizations", userRole = "general" }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh', fontFamily: 'Poppins, sans-serif', backgroundColor: '#F8F8F8' }}>
      <Header placeholder={placeholder} />
      <div className="d-flex flex-grow-1">
        <SidePanel isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} userRole={userRole} />
        <main className="p-4 flex-grow-1">{children}</main>
      </div>
      <Footer />
    </div>
  );
}