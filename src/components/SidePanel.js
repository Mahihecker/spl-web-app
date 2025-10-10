"use client";

import SidePanelContent from './SidePanelContent';

export default function SidePanel({ isSidebarOpen, setIsSidebarOpen, userRole }) {
  return (
    <div
      className="bg-white sidebar border-end position-relative transition-all d-flex flex-column"
      style={{
        overflow: 'outofflow',
        height: '492px',
        width: isSidebarOpen ? '190px' : '55px',
        paddingLeft: '2px',
        transition: 'width 0.3s ease',
      }}
    >
      {/* Toggle Icon */}
      <div
        className="position-absolute"
        style={{
          top: '43px',
          right: '16px',
          cursor: 'pointer',
        }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <img
          src="/images/dashboard-icon.png"
          alt="Toggle"
          style={{ width: '19px', height: '19px', transition: 'transform 0.3s ease' }}
        />
      </div>

      <SidePanelContent isSidebarOpen={isSidebarOpen} userRole={userRole} />
    </div>
  );
}