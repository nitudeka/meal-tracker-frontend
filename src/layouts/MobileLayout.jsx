const MobileLayout = ({ children }) => {
  const bgClassName =
    "bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%";

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${bgClassName}`}
    >
      <div className="mobile-container">{children}</div>
    </div>
  );
};

export default MobileLayout;
