import LoadingAnimation from "@/components/LoadingAnimation";
import SideBar from "@/components/SideBar";

const loading = () => {
  return (
    <div className="flex h-dvh">
      <SideBar currentPath="/messages" />
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        <p className="mb-5 text-sm font-medium text-[#171717] antialiased">
          Loading Messages
        </p>
        <LoadingAnimation />
      </div>
    </div>
  );
};

export default loading;
