import BottomNav from "@/components/bottomNav";

const MobileLayout = ({ children }) => {
  const bgClassName = "bg-gray-900";

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${bgClassName}`}
    >
      <div className="mobile-container">
        <div className="relative pb-16 h-full">
          {children}
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;
