type LimitMessageProps = {
  dailyLimit: number | null;
};

const LimitMessage = ({ dailyLimit }: LimitMessageProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#e5e5e5] bg-white p-5 md:gap-6 md:p-7 lg:p-10">
      <p className="text-[clamp(1rem,2vw,1.125rem)]">
        Limit Message
        <span className="ml-2 rounded-lg bg-[#65a30d] px-2 py-1 text-[clamp(.75rem,2vw,.9rem)] text-white">
          {dailyLimit ?? "Not Set"}
        </span>
      </p>
      <input
        type="number"
        name="dailyLimit"
        className="no-spinner md:text-md w-full rounded-lg border border-[#e5e5e5] p-3 pl-4 text-sm transition-colors duration-200 placeholder:text-[#a3a3a3] focus:border-[#65a30d] focus:ring-2 focus:ring-[#65a30d]/15 focus:outline-none md:p-5"
        placeholder="ex: 10"
      />
    </div>
  );
};

export default LimitMessage;
