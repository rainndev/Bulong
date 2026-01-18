import LoadingAnimation from "@/components/LoadingAnimation";
import SideBar from "@/components/SideBar";

const loading = () => {
  return (
    <div className="flex h-dvh">
      <SideBar currentPath="/settings" />
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        <p className="md:text-md mb-5 text-sm font-medium text-[#242731] antialiased">
          Loading Settings
        </p>
        <LoadingAnimation />
      </div>
    </div>
  );
};

export default loading;
