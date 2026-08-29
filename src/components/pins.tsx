export const PushPin = ({ className }: { className?: string }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    {/* pin head */}
    <circle
      cx="14"
      cy="9"
      r="6.5"
      fill="#a3e635"
      stroke="#1f1c14"
      strokeWidth="2.5"
    />
    {/* highlight */}
    <path
      d="M 10.5 6.5 Q 12 5, 14 5"
      fill="none"
      stroke="#fdfaf2"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* needle */}
    <path
      d="M 14 15.5 L 14 24"
      fill="none"
      stroke="#1f1c14"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

export const SafetyPin = ({ className }: { className?: string }) => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    {/* clasp outer loop */}
    <path
      d="M 22 4 Q 30 5, 29.5 12 Q 29 18, 23 21.5"
      fill="none"
      stroke="#1f1c14"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* clasp inner loop */}
    <path
      d="M 24.5 8 Q 26.5 9, 26 12 Q 25.5 15, 23 17"
      fill="none"
      stroke="#1f1c14"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* pin body */}
    <path
      d="M 23 21.5 Q 14 19, 8.5 13 Q 4 8, 6 5.5 Q 8 3, 12 8 Q 17 14.5, 18.5 23.5"
      fill="none"
      stroke="#a3e635"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* needle */}
    <path
      d="M 18.5 23.5 L 22 30"
      fill="none"
      stroke="#1f1c14"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);
