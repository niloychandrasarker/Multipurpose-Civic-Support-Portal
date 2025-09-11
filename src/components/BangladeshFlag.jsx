const BangladeshFlag = ({ className = "h-6 w-4" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 3 2"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Green background */}
      <rect width="3" height="2" fill="#006A4E" />
      {/* Red circle */}
      <circle cx="1.2" cy="1" r="0.6" fill="#F42A41" />
    </svg>
  );
};

export default BangladeshFlag;
