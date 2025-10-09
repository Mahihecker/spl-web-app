"use client";

import { useState } from 'react';

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <nav className="navbar navbar-light bg-light p-3 w-100">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="/images/logo.png" alt="SPL Logo" height="30" />
          </a>
          <input className="form-control w-25" type="search" placeholder="Search organizations" style={{ fontSize: '14px' }} />
        </div>
      </nav>

      {/* Main Content with Side Panel and Children */}
      <div className="d-flex flex-grow-1">
        {/* Side Panel */}
        <div
          className={`bg-light sidebar ${isSidebarOpen ? 'w-239' : 'w-0'} p-3 transition-all position-relative`}
          style={{ overflow: 'hidden', height: '645px' }}
        >
          {/* Toggle Icon */}
          <div
            className="position-absolute top-0 end-0 m-2"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src="/images/dashboard-icon.png"
              alt="Toggle"
              style={{ width: '20px', transition: 'all 0.3s' }}
            />
            <span
              className="position-absolute top-0 end-100 bg-purple h-100"
              style={{
                width: '0',
                transition: 'width 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.width = '20px')}
              onMouseLeave={(e) => (e.currentTarget.style.width = '0')}
            />
          </div>

          {/* Navigation Items */}
          <ul className="nav flex-column mt-5">
            <li className="nav-item mb-3">
              <a
                href="/"
                className="nav-link d-flex align-items-center text-dark"
                style={{ textDecoration: 'none', fontSize: '14px' }}
              >
                <img src="/images/home-icon.png" alt="Home" style={{ width: '20px', marginRight: '8px' }} />
                Home
                <span
                  className="position-absolute end-0 bg-purple h-100"
                  style={{
                    width: '0',
                    transition: 'width 0.3s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.width = '20px')}
                  onMouseLeave={(e) => (e.currentTarget.style.width = '0')}
                />
              </a>
            </li>
            <li className="nav-item mb-3">
              <a
                href="/favorites"
                className="nav-link d-flex align-items-center text-dark"
                style={{ textDecoration: 'none', fontSize: '14px' }}
              >
                <img src="/images/fav-icon.png" alt="Favorites" style={{ width: '20px', marginRight: '8px' }} />
                Favorites
                <span
                  className="position-absolute end-0 bg-purple h-100"
                  style={{
                    width: '0',
                    transition: 'width 0.3s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.width = '20px')}
                  onMouseLeave={(e) => (e.currentTarget.style.width = '0')}
                />
              </a>
            </li>
          </ul>

          {/* Profile and Logout at Bottom */}
          <div className="mt-auto">
            <div className="d-flex align-items-center mb-2">
              <img src="/images/profile-pic.jpg" alt="Profile" className="rounded-circle" width="40" />
              <p className="text-muted ms-2 mb-0" style={{ fontSize: '14px' }}>
                Zeeshan Javed<br />hello@tailgrids.com
              </p>
            </div>
            <a
              href="/logout"
              className="nav-link d-flex align-items-center text-dark"
              style={{ textDecoration: 'none', fontSize: '14px' }}
            >
              <img src="/images/logout-icon.png" alt="Log Out" style={{ width: '20px', marginRight: '8px' }} />
              Log Out
              <span
                className="position-absolute end-0 bg-purple h-100"
                style={{
                  width: '0',
                  transition: 'width 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.width = '20px')}
                onMouseLeave={(e) => (e.currentTarget.style.width = '0')}
              />
            </a>
          </div>
        </div>

        {/* Content Area */}
        <main className="p-4 flex-grow-1">{children}</main>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white p-3 text-center w-100">
        <div className="d-flex justify-content-between">
          <div style={{ fontSize: '14px' }}>
            <img src="/images/logo2.png" alt="SPL Logo" height="20" className="me-2" />
          </div>
          <div style={{ fontSize: '14px' }}>
            Company<br />About us
          </div>
          <div style={{ fontSize: '14px' }}>
            Address<br />Center for Language Engineering (CLE)<br />University of Engineering and Technology (UET)<br />G.T. Road, Lahore 54890, Pakistan
          </div>
          <div style={{ fontSize: '14px' }}>
            Socials<br />
            <a href="#"><i className="bi bi-instagram text-white me-2"></i></a>
            <a href="#"><i className="bi bi-facebook text-white me-2"></i></a>
            <a href="#"><i className="bi bi-linkedin text-white"></i></a>
          </div>
        </div>
        <p className="mt-2" style={{ fontSize: '14px' }}>&copy; 2025. All rights reserved to Sign Language Production</p>
      </footer>
    </div>
  );
}