type LimitMessageProps = {
  dailyLimit: number | null;
};

const LimitMessage = ({ dailyLimit }: LimitMessageProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow shadow-violet-100 md:gap-6 md:p-7 lg:p-10">
      <p className="text-[clamp(1rem,2vw,1.125rem)]">
        Limit Message
        <span className="ml-2 rounded-lg bg-violet-300 px-2 py-1 text-[clamp(.75rem,2vw,.9rem)] text-white">
          {dailyLimit ?? "Not Set"}
        </span>
      </p>
      <input
        type="number"
        name="dailyLimit"
        className="no-spinner md:text-md w-full rounded-2xl border-2 border-violet-300 p-3 pl-4 text-sm transition-colors duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 focus:ring-offset-white focus:outline-none md:p-5"
        placeholder="ex: 10"
      />
    </div>
  );
};

export default LimitMessage;
