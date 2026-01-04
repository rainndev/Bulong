import LoadingAnimation from "@/components/LoadingAnimation";

const Loading = () => {
  return (
    <div className="flex h-dvh">
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        <p className="md:text-md mb-5 text-sm font-medium text-[#242731] antialiased">
          Loading Sign In Page...
        </p>
        <LoadingAnimation />
      </div>
    </div>
  );
};

export default Loading;
