import React from 'react';

const OrganizationCard = ({ logoUrl, nameLine1, nameLine2 }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: '6px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '30px', // Increased padding to accommodate larger height
        width: '390px',
        height: '166px',
        margin: '10px auto',
      }}
    >
      {/* Logo Section */}
      <div
        style={{
          flex: '0 0 auto',
          width: '124px',
          height: '124px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '30px', // Gap between img and purple bar
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

      {/* Purple Separator Bar - 6px width, center aligned */}
      <div
        style={{
          width: '4px',
          height: '48px',
          backgroundColor: '#5437ED',
          marginRight: '30px', // Gap between purple bar and text
          alignSelf: 'center', // Center align the bar vertically
        }}
      />

      {/* Organization Name Section - Left aligned */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'left', // Explicit left alignment
        }}
      >
        <span
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '20px',
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
            fontSize: '20px',
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