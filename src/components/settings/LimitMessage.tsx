type LimitMessageProps = {
  dailyLimit: number | null;
};

const LimitMessage = ({ dailyLimit }: LimitMessageProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg border-2 border-[#1f1c14] bg-white p-5 shadow-[6px_6px_0_#1f1c14] transition-transform duration-100 hover:rotate-0 md:p-6">
      <p className="text-base font-bold">
        Limit Message
        <span className="ml-2 rounded-full border-2 border-[#1f1c14] bg-[#a3e635] px-2 py-0.5 text-xs font-bold text-[#1f1c14]">
          {dailyLimit ?? "Not Set"}
        </span>
      </p>
      <input
        type="number"
        name="dailyLimit"
        className="no-spinner w-full rounded-lg border-2 border-[#1f1c14] bg-[#fdfaf2] p-3 pl-4 text-sm font-bold transition-all duration-200 placeholder:font-normal placeholder:text-[#1f1c14]/30 focus:ring-4 focus:ring-[#a3e635]/50 focus:outline-none"
        placeholder="ex: 10"
      />
      <p className="text-xs font-bold text-[#1f1c14]/50">
        Max anonymous messages per day
      </p>
    </div>
  );
};

export default LimitMessage;
