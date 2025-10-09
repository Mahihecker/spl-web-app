"use client";
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found. Please log in.');
        }

        const response = await fetch('http://localhost:8000/api/organizations/', {
          headers: {
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch organizations');
        }

        const data = await response.json();
        // Limit to 2 organizations as per current requirement
        setOrganizations(data.slice(0, 2));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (error) return <p className="text-center p-4 text-danger">Error: {error}</p>;

  return (
    <div>
      <div className="bg-light p-4 text-center" style={{ backgroundColor: '#f0f2f5' }}>
        <h1 className="display-4">Hello, Musharof</h1>
        <p className="lead">Start exploring your signed learning journey</p>
        <div className="position-absolute top-0 end-0 m-3">
          <img src="/images/profile-pic.jpg" alt="Profile" className="rounded-circle" width="40" />
        </div>
      </div>
      <div className="p-4">
        <h2>Organizations</h2>
        <div className="row g-4">
          {organizations.map((org) => (
            <div key={org.id} className="col-md-4">
              <div className="card p-3 text-center">
                <h5>{org.name}</h5>
                <img
                  src={`/images/${org.name.toLowerCase().replace(' ', '-')}-logo.png`}
                  alt={org.name}
                  className="card-img-top mx-auto"
                  style={{ maxWidth: '150px' }}
                  onError={(e) => { e.target.src = '/images/default-logo.png'; }} // Fallback image
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}