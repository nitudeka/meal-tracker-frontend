import BottomNav from "@/components/bottomNav";
import { isMobileDevice } from "../lib/utils";

const MobileLayout = ({ children }) => {
  const bgClassName = "bg-gray-900";
  const isMobile = isMobileDevice();

  if (isMobile) {
    return (
      <div className="relative pb-16 h-full">
      {children}
      <div className="fixed bottom-0 left-0 right-0">
        <BottomNav />
      </div>
    </div>
    )
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${bgClassName}`}
    >
      <div className="mobile-container overflow-hidden">
        <div className="relative pb-16 h-full">
          {children}
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;
