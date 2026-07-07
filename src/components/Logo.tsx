export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/wharp-logo.svg"
      alt="Wharp"
      className={className}
      draggable={false}
      style={{ filter: "brightness(0)" }}
    />
  );
}
