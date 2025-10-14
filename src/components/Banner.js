// src/components/Banner.js
'use client';

import { Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

export default function Banner() {
  const { user } = useAuth();
  const firstName = user?.username?.split(' ')[0] || 'User';

  // Determine greeting based on current time (PKT)
  const now = new Date();
  const hours = now.getUTCHours() + 5; // PKT is UTC+5
  let greeting = 'Good Morning';
  if (hours >= 12 && hours < 17) greeting = 'Good Afternoon';
  if (hours >= 17 || hours < 5) greeting = 'Good Evening';

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '243px',
        background: `url('/images/banner.png') no-repeat center center / cover`,
        width: '100%',
        zIndex: 0, // Ensure banner is below side panel
      }}
    >
      <Container
        fluid
        className="p-0"
        style={{ position: 'relative', zIndex: 2, paddingLeft: '20px' }}
      >
        <div
          style={{
            position: 'absolute',
            top: '58px',
            left: '84px',
            color: '#000000',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            transform: 'translate(-50%, -50%)',
            fontSize: '16px',
            textAlign: 'left',
            textShadow: 'none',
          }}
        >
          {greeting + '!'}
        </div>
        <div
          style={{
            position: 'absolute',
            top: '119px',
            left: '27px',
            color: '#000000',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '36px',
            textAlign: 'left',
          }}
        >
          <span style={{ fontWeight: 600 }}>Hello,</span>{' '}
          <span style={{ fontWeight: 400 }}>{firstName}</span>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '165px',
            left: '27px',
            color: '#000000',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '12.25px',
            textAlign: 'left',
            fontWeight: 500,
            textShadow: 'none',
          }}
        >
          Start exploring your <span style={{ color: '#5437ED' }}>signed learning </span>journey
        </div>
      </Container>
    </div>
  );
}