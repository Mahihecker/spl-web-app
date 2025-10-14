// src/components/Header.js
'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';

export default function Header({ placeholder = 'Search organizations' }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { searchTerm, setSearchTerm, searchableData, isSearching, setIsSearching } = useSearch();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const isPublicPage = ['/', '/login', '/signup'].includes(pathname);

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target) &&
          dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const suggestions = searchableData
    .filter(item => 
      item.name && 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      searchTerm.length > 0
    )
    .slice(0, 5);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
    setIsSearching(value.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setShowSuggestions(false);
    setIsSearching(true);
    // Focus back to input
    inputRef.current?.focus();
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
    setIsSearching(false);
  };

  if (isPublicPage && pathname !== '/') {
    return null;
  }

  if (isPublicPage) {
    return (
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">
            <img src="/images/logo.png" alt="SPL Logo" height="45" />
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Signup</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }

  return (
    <nav
      className="navbar navbar-light w-100"
      style={{
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.24)',
        backdropFilter: 'blur(50px)',
        position: 'relative',
        zIndex: 10,
        height: '60px',
        padding: '1px 4px 1px 2px',
      }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src="/images/logo.png" alt="SPL Logo" height="45px" />
        </a>
        <div className="input-group position-relative" style={{ width: '374px', height: '32px' }}>
          <span className="input-group-text" style={{ 
            backgroundColor: '#ffffff', 
            borderColor: '#A2A2A2', 
            padding: '0 8px', 
            borderRight: 'none' 
          }}>
            <img src="/images/search-icon.png" alt="Search" style={{ width: '15px', height: '15px' }} />
          </span>
          <input
            ref={inputRef}
            className="form-control"
            type="search"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            style={{ 
              fontSize: '12px', 
              color: '#000000', // Changed to black
              backgroundColor: '#ffffff', 
              borderColor: '#A2A2A2', 
              height: '32px', 
              paddingLeft: '8px',
              borderRadius: '0  4px 4px 0',
              paddingRight: '10px', // Added padding for clear button
              borderLeft: 'none', 
              outline: 'none', 
              boxShadow: 'none' 
            }}
          />
          {searchTerm && (
            <button
              type="button"
              className="btn btn-sm"
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 5,
                background: 'none',
                border: 'none',
                padding: '0',
                width: '16px',
                height: '16px'
              }}
              onClick={handleClearSearch}
              aria-label="Clear search"
            />
          )}
          
          {/* Suggestions Dropdown */}
          {(showSuggestions || focused) && suggestions.length > 0 && (
            <div
              ref={dropdownRef}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #A2A2A2',
                borderTop: 'none',
                borderRadius: '0 0 4px 4px',
                maxHeight: '200px',
                overflowY: 'auto',
                zIndex: 1000,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  className="p-2 suggestion-item"
                  style={{
                    cursor: 'pointer',
                    padding: '8px 12px',
                    borderBottom: '1px solid #f0f0f0',
                    fontSize: '12px'
                  }}
                  onClick={() => handleSuggestionClick(item)}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}