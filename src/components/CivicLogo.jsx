const CivicLogo = ({
  className = "h-10 w-10",
  textColor = "text-blue-600",
}) => {
  return (
    <svg
      className={`${className} ${textColor}`}
      fill="currentColor"
      viewBox="0 0 64 64"
    >
      {/* Government Building Base */}
      <rect
        x="8"
        y="45"
        width="48"
        height="15"
        fill="currentColor"
        opacity="0.9"
      />

      {/* Building Columns */}
      <rect x="12" y="25" width="4" height="20" fill="currentColor" />
      <rect x="20" y="25" width="4" height="20" fill="currentColor" />
      <rect x="28" y="25" width="4" height="20" fill="currentColor" />
      <rect x="36" y="25" width="4" height="20" fill="currentColor" />
      <rect x="44" y="25" width="4" height="20" fill="currentColor" />
      <rect x="52" y="25" width="4" height="20" fill="currentColor" />

      {/* Building Top/Roof */}
      <polygon points="32,8 10,22 54,22" fill="currentColor" />

      {/* Flag pole */}
      <rect x="30" y="2" width="1.5" height="15" fill="currentColor" />

      {/* Flag */}
      <polygon
        points="31.5,2 31.5,8 42,6 31.5,4"
        fill="#10B981"
        opacity="0.8"
      />

      {/* Main entrance */}
      <rect x="26" y="35" width="12" height="10" fill="white" opacity="0.3" />

      {/* Steps */}
      <rect
        x="22"
        y="43"
        width="20"
        height="2"
        fill="currentColor"
        opacity="0.7"
      />

      {/* Shield overlay for security/protection */}
      <path
        d="M32 12 L24 16 L24 26 C24 30 28 34 32 36 C36 34 40 30 40 26 L40 16 Z"
        fill="white"
        opacity="0.8"
        stroke="currentColor"
        strokeWidth="0.5"
      />

      {/* Checkmark in shield */}
      <path
        d="M28 24 L30 26 L36 20"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CivicLogo;
