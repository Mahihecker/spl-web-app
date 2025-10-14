// src/components/Footer.js
'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  if (['/login', '/signup'].includes(pathname)) {
    return null;
  }

  return (
    <footer
      className="bg-purple text-white p-3 w-100 d-flex flex-column justify-content-between"
      style={{
        height: 'auto',
        minHeight: '190px',
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      {/* Main Content - Responsive */}
      <div
        className="d-flex justify-content-between flex-md-row flex-column"
        style={{
          gap: '10px',
          padding: '6px 15px',
          ...(window.innerWidth < 768 && { padding: '8px 15px' })
        }}
      >
        <div
          className="d-flex gap-md-5 flex-md-row flex-column w-100"
          style={{
            gap: window.innerWidth >= 768 ? '80px' : '15px',
            alignItems: window.innerWidth >= 768 ? 'flex-start' : 'flex-start'
          }}
        >
          {/* Logo */}
          <div className="d-flex align-items-center mb-md-0 mb-2">
            <img
              src="/images/logo2.png"
              alt="SPL Logo"
              className="me-2"
              style={{
                height: window.innerWidth >= 768 ? '65px' : 'clamp(35px, 8vw, 45px)',
                width: 'auto'
              }}
            />
          </div>

          {/* Company */}
          <div className="text-start" style={{ minWidth: 0 }}>
            <span
              style={{
                fontWeight: 'bold',
                fontSize: window.innerWidth >= 768 ? '18px' : 'clamp(14px, 3vw, 16px)'
              }}
            >
              Company
            </span>
            <br />
            <span
              style={{
                fontWeight: '300',
                fontSize: window.innerWidth >= 768 ? '16px' : 'clamp(12px, 2.5vw, 14px)',
                fontStyle: 'italic',
                lineHeight: window.innerWidth >= 768 ? '0.112' : '1.3'
              }}
            >
              <a href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
                About us
              </a>
            </span>
          </div>

          {/* Address */}
          <div className="text-start" style={{ minWidth: 0 }}>
            <span
              style={{
                fontWeight: 'bold',
                fontSize: window.innerWidth >= 768 ? '18px' : 'clamp(14px, 3vw, 16px)'
              }}
            >
              Address
            </span>
            <br />
            <span
              style={{
                fontWeight: '300',
                fontSize: window.innerWidth >= 768 ? '16px' : 'clamp(11px, 2vw, 14px)',
                fontStyle: 'italic',
                lineHeight: window.innerWidth >= 768 ? '0.1px' : '1.4'
              }}
            >
              Center for Language Engineering (CLE)<br />
              University of Engineering and Technology (UET)<br />
              G.T. Road, Lahore 54890, Pakistan
            </span>
          </div>

          {/* Socials */}
          <div className="text-start d-flex flex-column" style={{ alignItems: 'flex-start' }}>
            <span
              style={{
                fontWeight: 'bold',
                fontSize: window.innerWidth >= 768 ? '18px' : 'clamp(14px, 3vw, 16px)',
                marginBottom: '2px'
              }}
            >
              Socials
            </span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <a href="#" className="d-inline-block">
                <i
                  className="bi bi-instagram text-white"
                  style={{
                    fontSize: window.innerWidth >= 768 ? '27px' : 'clamp(18px, 5vw, 22px)',
                    padding: '3px'
                  }}
                />
              </a>
              <a href="#" className="d-inline-block">
                <i
                  className="bi bi-facebook text-white"
                  style={{
                    fontSize: window.innerWidth >= 768 ? '27px' : 'clamp(18px, 5vw, 22px)',
                    padding: '3px'
                  }}
                />
              </a>
              <a href="#" className="d-inline-block">
                <i
                  className="bi bi-linkedin text-white"
                  style={{
                    fontSize: window.innerWidth >= 768 ? '27px' : 'clamp(18px, 5vw, 22px)',
                    padding: '3px'
                  }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr
        className="my-2"
        style={{
          borderColor: '#ffffff',
          opacity: 0.5,
          margin: window.innerWidth < 768 ? '10px 0' : '0'
        }}
      />

      {/* Copyright */}
      <div
        className="d-flex justify-content-between align-items-center flex-column flex-md-row"
        style={{
          fontSize: window.innerWidth >= 768 ? '14px' : 'clamp(12px, 2.5vw, 13px)',
          gap: window.innerWidth < 768 ? '5px' : '0'
        }}
      >
        <p
          className="mb-0 text-md-start text-center"
          style={{
            fontSize: window.innerWidth >= 768 ? '14px' : 'clamp(12px, 2.5vw, 13px)',
            fontWeight: '300',
            width: '100%',
            textAlign: window.innerWidth < 768 ? 'center' : 'left'
          }}
        >
          © 2025. All rights reserved to Sign Language Production
        </p>
      </div>
    </footer>
  );
}