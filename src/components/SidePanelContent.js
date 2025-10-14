'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function SidePanelContent({ isSidebarOpen, userRole }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
  };

  // Debugging: Log user data to verify it's available
  console.log('User data in SidePanelContent:', user);

  if (!user) {
    console.log('No user data available, returning null');
    return null; // Prevent rendering if no user
  }

  const getNavigationContent = () => {
    switch (userRole.toLowerCase()) {
      case 'superadmin':
        return (
          <ul className="nav flex-column" style={{ marginTop: '68px', paddingLeft: '2px', gap: '25px' }}>
            {/* Add superadmin navigation items here */}
          </ul>
        );

      case 'organizationaladmin':
        return (
          <ul className="nav flex-column" style={{ marginTop: '68px', paddingLeft: '2px', gap: '25px' }}>
            {/* Add organizationaladmin navigation items here */}
          </ul>
        );

      case 'general':
      default:
        return (
          <ul className="nav flex-column" style={{ marginTop: '90px', gap: '25px', paddingLeft: '2px' }}>
            {/* Home */}
            <li
              className="nav-item mb-2"
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                alignItems: 'center',
              }}
            >
              <a
                href="/general/dashboard"
                className="nav-link d-flex align-items-center text-dark"
                style={{
                  textDecoration: 'none',
                  fontSize: '14px',
                  padding: isSidebarOpen ? '0 30px 0 14px' : '0 14px',
                  position: 'relative',
                }}
              >
                <img
                  src="/images/home-icon.png"
                  alt="Home"
                  style={{ width: '21px', marginRight: isSidebarOpen ? '2px' : '0', flexShrink: 0 }}
                  className={isSidebarOpen ? '' : 'mx-auto'}
                />
                {isSidebarOpen && <span className="ms-0" style={{ lineHeight: '21px' }}>Home</span>}
              </a>
              {(pathname === '/general/dashboard') && (
                <span
                  style={{
                    position: 'absolute',
                    right: '0',
                    top: '0',
                    width: '6px',
                    height: '100%',
                    backgroundColor: '#5437ED',
                    display: 'block',
                  }}
                />
              )}
            </li>

            {/* Favourites */}
            <li
              className="nav-item mb-2"
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                alignItems: 'center',
              }}
            >
              <a
                href="/favourites"
                className="nav-link d-flex align-items-center text-dark"
                style={{
                  textDecoration: 'none',
                  fontSize: '14px',
                  padding: isSidebarOpen ? '0 30px 0 14px' : '0 14px',
                  position: 'relative',
                }}
              >
                <img
                  src="/images/fav-icon.png"
                  alt="Favourites"
                  style={{ width: '21px', marginRight: isSidebarOpen ? '30px' : '0', flexShrink: 0 }}
                  className={isSidebarOpen ? '' : 'mx-auto'}
                />
                {isSidebarOpen && <span className="ms-0" style={{ lineHeight: '21px' }}>Favourites</span>}
              </a>
              {(pathname === '/favourites') && (
                <span
                  style={{
                    position: 'absolute',
                    right: '0',
                    top: '0',
                    width: '6px',
                    height: '100%',
                    backgroundColor: '#5437ED',
                    display: 'block',
                  }}
                />
              )}
            </li>
          </ul>
        );
    }
  };

  return (
    <div className="d-flex flex-column h-100" style={{ paddingLeft: '2px' }}>
      {getNavigationContent()}
      <div className="mt-auto" style={{ paddingLeft: '4px', paddingBottom: '10px' }}>
        {/* Logout */}
        <li
          className="nav-item mb-2"
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: isSidebarOpen ? 'flex-start' : 'center',
            alignItems: 'center',
          }}
        >
          <button
            onClick={logout}
            className="nav-link d-flex align-items-center text-dark"
            style={{
              textDecoration: 'none',
              fontSize: '14px',
              padding: isSidebarOpen ? '0 30px 0 14px' : '0 14px',
              position: 'relative',
              gap: isSidebarOpen ? '4px' : '0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <img
              src="/images/logout-icon.png"
              alt="Logout"
              style={{
                width: '21px',
                marginRight: isSidebarOpen ? '4px' : '0',
                flexShrink: '0',
              }}
              className={isSidebarOpen ? '' : 'mx-auto'}
            />
            {isSidebarOpen && <span style={{ lineHeight: '21px', whiteSpace: 'nowrap' }}>Logout</span>}
          </button>
          {(pathname === '/logout') && (
            <span
              style={{
                position: 'absolute',
                right: '0',
                top: '0',
                width: '6px',
                height: '100%',
                backgroundColor: '#5437ED',
                display: 'block',
              }}
            />
          )}
        </li>
        {/* Profile */}
        <Link
          href={`/${user.role}/profile`}
          className="nav-link d-flex align-items-center text-dark"
          style={{ textDecoration: 'none', marginTop: '20px' }}
        >
          <div className="d-flex align-items-center" style={{ marginLeft: '5px' }}>
            <img
              src={user.pfp}
              alt="Profile"
              className="rounded-circle"
              width="35"
              style={{ flexShrink: 0 }}
            />
            {isSidebarOpen && (
              <div
                style={{
                  maxWidth: '140px',
                  overflow: 'hidden',
                  marginLeft: '8px',
                  flexShrink: 1,
                }}
              >
                <p
                  className="text-muted mb-0"
                  style={{
                    fontWeight: 'bold',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {truncateText(user.username || 'No Username', 13)}
                </p>
                <p
                  className="text-muted mb-0"
                  style={{
                    fontSize: '10px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {user.email || 'No Email'}
                </p>
              </div>
            )}
          </div>
          {pathname === `/${user.role}/profile` && (
            <span
              style={{
                position: 'absolute',
                right: '0',
                top: '0',
                width: '6px',
                height: '100%',
                backgroundColor: '#5437ED',
                display: 'block',
              }}
            />
          )}
        </Link>
      </div>
    </div>
  );
}