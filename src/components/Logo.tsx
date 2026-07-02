import logoAsset from "@/assets/wharp-logo.svg.asset.json";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Wharp"
      className={className}
      draggable={false}
      style={{ filter: "brightness(0)" }}
    />
  );
}

