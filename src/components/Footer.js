"use client";

export default function Footer() {
  return (
    <footer className="bg-primary text-white p-3 w-100" style={{ height: '120px', padding: '15px' }}>
      <div className="d-flex justify-content-between" style={{ fontSize: '14px' }}>
        <div>
          <img src="/images/logo2.png" alt="SPL Logo" height="50" className="me-2" />
        </div>
        <div>
          Company<br />About us
        </div>
        <div>
          Address<br />Center for Language Engineering (CLE)<br />University of Engineering and Technology (UET)<br />G.T. Road, Lahore 54890, Pakistan
        </div>
        <div>
          Socials<br />
          <a href="#"><i className="bi bi-instagram text-white me-2"></i></a>
          <a href="#"><i className="bi bi-facebook text-white me-2"></i></a>
          <a href="#"><i className="bi bi-linkedin text-white"></i></a>
        </div>
      </div>
      <hr className="my-2" style={{ borderColor: '#ffffff', opacity: 0.5 }} />
      <p className="mb-0 text-start" style={{ fontSize: '14px' }}>&copy; 2025. All rights reserved to Sign Language Production</p>
    </footer>
  );
}