import LoadingAnimation from "@/components/LoadingAnimation";
import { FaEnvelope } from "react-icons/fa";

const Loading = () => {
  return (
    <div>
      <div className="space-y-2 md:space-y-4">
        <h1 className="md:text-md rounded-lg bg-gray-50/5 p-2 pl-4 text-sm">
          Recent
        </h1>

        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-xl p-2 md:px-5"
          >
            <div>
              <FaEnvelope className="rotate-30 text-sm text-gray-50/40" />
            </div>

            <div className="flex w-full min-w-0 flex-col text-sm">
              <h1 className="text-md mb-1 animate-pulse rounded-lg bg-gray-50/5 font-semibold antialiased md:text-lg">
                <span className="invisible truncate">
                  Lorem ipsum dolor sit amet consectetur
                </span>
              </h1>
              <p className="animate-pulse rounded-lg bg-gray-50/5 text-xs text-[#949494] antialiased md:text-sm">
                <span className="invisible w-full truncate">
                  Lorem ipsum dolor sit amet consectetur
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
