// src/app/general/dashboard/page.js
'use client';

import { useEffect, useState } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { fetchData } from '../../../utils/api';
import OrganizationCard from '../../../components/OrganizationCard';
import Banner from '../../../components/Banner';

export default function GeneralDashboard() {
  const { user } = useAuth();
  const [orgs, setOrgs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadOrgs() {
      try {
        setLoading(true);
        const data = await fetchData('/organizations', true);
        console.log('Fetched organizations from organizations.json:', data);
        setOrgs(data);
        console.log('Final organizations set:', data);
      } catch (err) {
        setError('Failed to load organizations');
        console.error('Error fetching organizations:', err);
      } finally {
        setLoading(false);
      }
    }
    if (user) loadOrgs();
  }, [user]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [orgs]);

  // Handle sliding
  const itemsToShow = 2;
  const totalItems = orgs.length;
  const totalPages = Math.ceil(totalItems / itemsToShow);
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < totalPages - 1;
  const shouldShowArrows = totalItems > itemsToShow;

  const handleScrollLeft = () => {
    if (canScrollLeft) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleScrollRight = () => {
    if (canScrollRight) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (!user) return null;

  return (
    <div>
      <Banner />
      {/* Organizations Section */}
      <Container
        fluid
        className="p-4"
        style={{ position: 'relative', zIndex: 3 }}
      >
        <span style={{ fontWeight: 500, fontSize: '25px' }}>Organizations</span>
        {error && <Alert variant="danger">{error}</Alert>}
        {loading ? (
          <p>Loading organizations...</p>
        ) : (
          <div style={{ position: 'relative', minHeight: '120px' }}>
            {shouldShowArrows && (
              <Button
                variant="outline-primary"
                onClick={handleScrollLeft}
                disabled={!canScrollLeft}
                style={{
                  position: 'absolute',
                  left: '0px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: canScrollLeft ? 1 : 0.5,
                }}
              >
                ‹
              </Button>
            )}
            <div
              style={{
                overflow: 'hidden',
                padding: shouldShowArrows ? '0 60px' : '0 20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  transition: 'transform 0.3s ease-in-out',
                  transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
                  gap: '20px',
                }}
              >
                {Array.isArray(orgs) && orgs.length > 0 ? (
                  orgs.map((org, index) => {
                    const nameParts = org.name ? org.name.trim().split(' ') : ['No', 'Name'];
                    const nameLine1 = nameParts.length > 1 ? nameParts[0] : org.name || 'No';
                    const nameLine2 = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'Name';
                    return (
                      <div
                        key={org.id}
                        style={{
                          flex: `0 0 ${100 / itemsToShow}%`,
                          padding: '10px 0',
                          textAlign: 'center',
                          minWidth: 0,
                        }}
                      >
                        <Link href={`/general/org/${org.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <OrganizationCard
                            logoUrl={org.image || '/images/default-logo.png'}
                            nameLine1={nameLine1}
                            nameLine2={nameLine2}
                          />
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ width: '100%', textAlign: 'center', padding: '40px' }}>
                    <p>No organizations found.</p>
                  </div>
                )}
              </div>
            </div>
            {shouldShowArrows && (
              <Button
                variant="outline-primary"
                onClick={handleScrollRight}
                disabled={!canScrollRight}
                style={{
                  position: 'absolute',
                  right: '0px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: canScrollRight ? 1 : 0.5,
                }}
              >
                ›
              </Button>
            )}
          </div>
        )}
        {process.env.NODE_ENV === 'development' && (
          <small style={{ color: '#666' }}>
            Showing {currentIndex + 1}/{totalPages} | Total: {totalItems} orgs
          </small>
        )}
      </Container>
    </div>
  );
}