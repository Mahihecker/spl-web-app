// src/components/EssentialVocabTab.js
const EssentialVocabTab = ({ title, count, description }) => {
  return (
    <div
      className="relative flex flex-col items-center justify-center text-center rounded-lg shadow-md"
      style={{
        width: '220px',
        height: '42px',
        backgroundColor: '#EDEBFB', // light lavender tone
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Accent bar */}
      <div
        className="absolute left-0 top-1/2 transform -translate-y-1/2"
        style={{
          width: '2px',
          height: '60%',
          backgroundColor: '#5437ED',
        }}
      ></div>

      {/* Text */}
      <h2
        className="font-semibold"
        style={{
          color: '#5437ED',
          fontSize: '20px',
        }}
      >
        {title}
      </h2>
      <p
        style={{
          color: '#838799',
          fontSize: '16px',
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default EssentialVocabTab;
