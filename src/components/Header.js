"use client";

export default function Header({ placeholder }) {
  return (
    <nav
      className="navbar navbar-light w-100"
      style={{
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.24)', // Shadow effect
        backdropFilter: 'blur(50px)', // Blur effect
        position: 'relative',
        zIndex: 1, // Ensure header is above panel
        height: '60px', // Adjusted header height
        padding: '1px 4px 1px 2px', // Adjusted padding for header
      }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src="/images/logo.png" alt="SPL Logo" height="45px" />
        </a>
        <div className="input-group" style={{ width: '374px', height: '32px' }}>
          <span className="input-group-text" style={{ backgroundColor: '#ffffff', borderColor: '#A2A2A2', padding: '0 8px', borderRight: 'none' }}>
            <img src="/images/search-icon.png" alt="Search" style={{ width: '15px', height: '15px' }} />
          </span>
          <input
            className="form-control"
            type="search"
            placeholder={placeholder} // Dynamic placeholder
            style={{ fontSize: '12px', fontColor: '#a2a2a249', backgroundColor: '#ffffff', borderColor: '#A2A2A2', height: '32px', paddingLeft: '8px', borderLeft: 'none', outline: 'none', boxShadow: 'none' }}
          />
        </div>
      </div>
    </nav>
  );
}