import React from 'react';

const OrganizationCard = ({ logoUrl, nameLine1, nameLine2 }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '16px',
        width: '100%',
        maxWidth: '400px',
        margin: '10px auto',
        height: '80px',
      }}
    >
      {/* Logo Section */}
      <div
        style={{
          flex: '0 0 auto',
          width: '64px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '16px',
        }}
      >
        <img
          src={logoUrl || '/images/default-logo.png'}
          alt="Organization Logo"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Purple Separator Bar */}
      <div
        style={{
          width: '2px',
          height: '48px',
          backgroundColor: '#5437ED',
          marginRight: '16px',
        }}
      />

      {/* Organization Name Section */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: '#333333',
            lineHeight: '1.2',
          }}
        >
          {nameLine1 || 'Organization Name'}
        </span>
        <span
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            color: '#5437ED',
            lineHeight: '1.2',
          }}
        >
          {nameLine2 || 'Subtitle'}
        </span>
      </div>
    </div>
  );
};

export default OrganizationCard;