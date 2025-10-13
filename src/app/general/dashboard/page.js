// src/app/(general)/dashboard/page.js
'use client';

import { useEffect, useState } from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { fetchData } from '../../../utils/api';

export default function GeneralDashboard() {
    const { user } = useAuth();
    const [orgs, setOrgs] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0); // For sliding organizations

    useEffect(() => {
        async function loadOrgs() {
            try {
                setLoading(true);
                const data = await fetchData('/organizations', true);
                setOrgs(data.filter(org => user?.enrolledOrgIds?.includes(org.id)));
            } catch (err) {
                setError('Failed to load organizations');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        if (user) loadOrgs();
    }, [user]);

    // Determine greeting based on current time (PKT)
    const now = new Date();
    const hours = now.getUTCHours() + 5; // PKT is UTC+5
    let greeting = 'Good Morning';
    if (hours >= 12 && hours < 17) greeting = 'Good Afternoon';
    if (hours >= 17 || hours < 5) greeting = 'Good Evening'; // 01:01 AM PKT falls here
    // Extract first name from username with fallback
    const firstName = user?.username?.split(' ')[0] || 'User'; // Ensure fallback if username is undefined

    // Handle sliding
    const itemsToShow = 2;
    const totalItems = orgs.length;
    const canScrollLeft = currentIndex > 0;
    const canScrollRight = currentIndex + itemsToShow < totalItems;

    const handleScrollLeft = () => {
        if (canScrollLeft) setCurrentIndex(currentIndex - 1);
    };

    const handleScrollRight = () => {
        if (canScrollRight) setCurrentIndex(currentIndex + 1);
    };

    if (!user) return null; // Middleware will redirect

    return (
        <div>
            <div style={{ position: 'relative', minHeight: '243px', background: `url('/images/banner.png') no-repeat center center / cover` }}>
                <Container fluid className="p-0" style={{ position: 'relative', zIndex: 2, paddingLeft: '20px' }}>
                    {/* Greeting Overlay */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '58px',
                            left: '84px',
                            color: '#000000',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 500, // Semi-bold
                            transform: 'translate(-50%, -50%)',
                            fontSize: '16px',
                            textAlign: 'left',
                            textShadow: 'none',
                        }}
                    >{greeting + '!'}
                    </div>
                    {/* Personalized Greeting */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '129px', // 104px (time greeting) + 75px (distance)
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
                    {/* Static Text */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '175px', // 179px (personalized greeting) + 30px (approximate spacing)
                            left: '27px',
                            color: '#000000',
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '12.25px',
                            textAlign: 'left',
                            fontWeight: 500,
                            textShadow: 'none',
                        }}
                    >
                        Start exploring your<span style={{ color: '#5437ED' }}> signed learning </span>journey
                    </div>
                </Container>
            </div>

            {/* Organizations Section */}
            <div className="p-4" style={{ position: 'relative', zIndex: 3 }}>
                 <span style={{ fontWeight: 500,fontSize: '25px' }}>Organizations</span>
                {error && <Alert variant="danger">{error}</Alert>}
                {loading ? (
                    <p>Loading organizations...</p>
                ) : (
                    <div style={{ position: 'relative', minHeight: '150px' }}>
                        <Button
                            variant="outline-secondary"
                            onClick={handleScrollLeft}
                            disabled={!canScrollLeft}
                            style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
                        >
                            &lt;
                        </Button>
                        <div style={{ overflow: 'hidden' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    transition: 'transform 0.3s ease',
                                    transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
                                }}
                            >
                                {orgs.map((org, index) => (
                                    <div
                                        key={org.id}
                                        style={{
                                            flex: `0 0 ${100 / itemsToShow}%`,
                                            padding: '10px',
                                            textAlign: 'center',
                                            minWidth: 0,
                                        }}
                                    >
                                        <Link href={`/general/org/${org.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div
                                                style={{
                                                    border: '1px solid #ddd',
                                                    borderRadius: '8px',
                                                    padding: '20px',
                                                    height: '100px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: '#f9f9f9',
                                                }}
                                            >
                                                {org.name}
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Button
                            variant="outline-secondary"
                            onClick={handleScrollRight}
                            disabled={!canScrollRight}
                            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
                        >
                            &gt;
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}