import LoadingAnimation from "@/components/LoadingAnimation";
import { FaEnvelope } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="h-full space-y-2 rounded-3xl border border-violet-200 bg-violet-100 p-6 text-[#242731] md:space-y-4">
      <h1 className="lg:text-md rounded-lg bg-violet-950/10 p-2 pl-3 text-xs text-[#242731]/60 md:pl-4 md:text-sm">
        Recent
      </h1>

      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-xl p-2 md:px-5">
          <div>
            <FaEnvelope className="rotate-30 text-sm text-violet-950/40" />
          </div>

          <div className="flex w-full min-w-0 flex-col text-sm">
            <h1 className="text-md mb-1 animate-pulse rounded-lg bg-violet-950/15 font-semibold antialiased md:text-lg">
              <span className="invisible truncate">
                Lorem ipsum dolor sit amet consectetur
              </span>
            </h1>
            <p className="animate-pulse rounded-lg bg-violet-950/15 text-xs text-[#949494] antialiased md:text-sm">
              <span className="invisible w-full truncate">
                Lorem ipsum dolor sit amet consectetur
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
