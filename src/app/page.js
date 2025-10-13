'use client';

import Link from 'next/link';
import { Container, Button } from 'react-bootstrap';

export default function LandingPage() {
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to Sign Language Production</h1>
      <p>A role-based platform for general users, super admins, and organizational admins.</p>
      <div className="mt-4">
        <Link href="/login">
          <Button variant="primary" className="me-2">
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="outline-primary">
            Signup
          </Button>
        </Link>
      </div>
    </Container>
  );
}