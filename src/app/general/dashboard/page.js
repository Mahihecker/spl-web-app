// src/app/general/dashboard/page.js
'use client';

import { useEffect, useState, useContext } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { useSearch } from '../../../context/SearchContext';
import { fetchData } from '../../../utils/api';
import OrganizationCard from '../../../components/OrganizationCard';
import Banner from '../../../components/Banner';

export default function GeneralDashboard() {
  const { user } = useAuth();
  const { searchTerm, searchableData, isSearching, setSearchableData } = useSearch();
  const [orgs, setOrgs] = useState([]);
  const [originalOrgs, setOriginalOrgs] = useState([]); // Keep original order
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadOrgs() {
      try {
        setLoading(true);
        const data = await fetchData('/organizations', true);
        console.log('Fetched organizations:', data);
        setOriginalOrgs(data);
        setOrgs(data);
        setSearchableData(data); // Set for search suggestions
      } catch (err) {
        setError('Failed to load organizations');
        console.error('Error fetching organizations:', err);
      } finally {
        setLoading(false);
      }
    }
    if (user) loadOrgs();
  }, [user, setSearchableData]);

  // Filter and reorder organizations based on search
  useEffect(() => {
    if (!isSearching || !searchTerm) {
      // Reset to original order and position
      setOrgs(originalOrgs);
      setCurrentIndex(0);
      return;
    }

    // Filter matching organizations
    const matchingOrgs = originalOrgs.filter(org => 
      org.name && org.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Keep non-matching in original relative order
    const nonMatchingOrgs = originalOrgs.filter(org => 
      !org.name || !org.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Put matching at the top, then non-matching
    const reorderedOrgs = [...matchingOrgs, ...nonMatchingOrgs];
    setOrgs(reorderedOrgs);
    
    // Reset index to show search results at top
    setCurrentIndex(0);
  }, [searchTerm, isSearching, originalOrgs]);

  // Handle sliding
  const itemsToShow = 2;
  const totalItems = orgs.length;
  const totalPages = Math.ceil(totalItems / itemsToShow);
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < totalPages - 1;
  const shouldShowArrows = totalItems > itemsToShow;

  const splitOrganizationName = (fullName) => {
    if (!fullName || typeof fullName !== 'string') {
      return { nameLine1: 'Organization', nameLine2: 'Name' };
    }

    const words = fullName.trim().split(/\s+/);

    if (words.length > 1) {
      const nameLine2 = words[words.length - 1];
      const nameLine1 = words.slice(0, -1).join(' ');
      return { nameLine1, nameLine2 };
    }

    return { nameLine1: fullName, nameLine2: '' };
  };

  const handleScrollLeft = () => {
    if (canScrollLeft) {
      setCurrentIndex(currentIndex - 2);
    }
  };

  const handleScrollRight = () => {
    if (canScrollRight) {
      setCurrentIndex(currentIndex + 2);
    }
  };

  if (!user) return null;

  return (
    <div>
      <Banner />
      {/* Organizations Section */}
      <Container
        fluid
        style={{ position: 'relative', zIndex: 3, padding: '10px 0 5px 23px' }}
      >
        <span style={{ fontWeight: 600, fontSize: '25px' }}>
          Organizations
        </span>
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
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  transition: 'transform 0.3s ease-in-out',
                  transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
                  gap: '20px'
                }}
              >
                {Array.isArray(orgs) && orgs.length > 0 ? (
                  orgs.map((org, index) => {
                    const { nameLine1, nameLine2 } = splitOrganizationName(org.name);
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
                        <Link href={`/general/dashboard/${org.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                    <p>{isSearching ? 'No organizations match your search.' : 'No organizations found.'}</p>
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
      </Container>
    </div>
  );
}