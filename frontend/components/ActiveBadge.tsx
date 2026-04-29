type activeBadgeTypes = {
  isActive: boolean;
};

export default function ActiveBadge({ isActive }: activeBadgeTypes) {
  return (
    <div>
      <p
        className={`py-1 px-2 rounded-4xl text-sm font-bold flex justify-center items-center gap-2 ${
          isActive ? "bg-badge-active" : "bg-badge-disabled"
        }`}
      >
        {isActive && (
          <span className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
        )}
        {isActive ? "Active" : "Inactive"}
      </p>
    </div>
  );
}
