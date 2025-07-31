const MobileLayout = ({ children }) => {
  const bgClassName = "bg-gray-900";

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${bgClassName}`}
    >
      <div className="mobile-container">{children}</div>
    </div>
  );
};

export default MobileLayout;
