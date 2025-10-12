"use client";

export default function Footer() {
  return (
    <footer className="bg-purple text-white p-3 w-100 d-flex flex-column justify-content-between" style={{ height: '190px', fontFamily: 'Poppins, sans-serif'}}>
      <div className="d-flex justify-content-between" style={{ gap: '10px', padding: '6px 15px' }}>
        <div className="d-flex" style={{ gap: '80px' }}>
          <div>
            <img src="/images/logo2.png" alt="SPL Logo" height="65" className="me-2" />
          </div>
          <div>
            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Company</span><br />
            <span style={{ fontWeight: '300', fontSize: '16px', fontStyle: 'italic',lineHeight: '0.112'}}><a href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>About us</a></span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Address</span><br />
            <span style={{ fontWeight: '300', fontSize: '16px', fontStyle: 'italic',lineHeight: '0.1px' }}>
              Center for Language Engineering (CLE)<br />
              University of Engineering and Technology (UET)<br />
              G.T. Road, Lahore 54890, Pakistan
            </span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Socials</span><br />
            <span style={{ fontWeight: '300'}}>
              <a href="#"><i className="bi bi-instagram text-white me-2" style={{ fontSize: '27px',padding:'3px' }}></i></a>
              <a href="#"><i className="bi bi-facebook text-white me-2" style={{ fontSize: '27px',padding:'3px' }}></i></a>
              <a href="#"><i className="bi bi-linkedin text-white" style={{ fontSize: '27px',padding:'3px' }}></i></a>
            </span>
          </div>
         </div> 
      </div>
      <hr className="my-2" style={{ borderColor: '#ffffff', opacity: 0.5 }} />
      <div className="d-flex justify-content-between align-items-center" style={{ fontSize: '14px' }}>
        <p className="mb-0" style={{ fontSize: '14px', fontWeight: '300' }}>
          &copy; 2025. All rights reserved to Sign Language Production
        </p>
      </div>
    </footer>
  );
}