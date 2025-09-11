const MapPlaceholder = ({ height = "400px", children }) => {
  return (
    <div
      className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative"
      style={{ height }}
    >
      <div className="text-center">
        <svg
          className="mx-auto h-16 w-16 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-600 mb-2">
          Interactive Map
        </h3>
        <p className="text-gray-500">Map integration placeholder</p>
      </div>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default MapPlaceholder;
