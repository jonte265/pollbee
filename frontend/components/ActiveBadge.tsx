type activeBadgeTypes = {
  isActive: boolean;
};

function ActiveBadge({ isActive }) {
  return (
    <div>
      <p
        className={`py-1 px-2 rounded-4xl text-sm font-semibold flex justify-center items-center gap-2 ${
          isActive ? 'bg-green-200' : 'bg-red-200'
        }`}
      >
        {isActive && (
          <span className='h-2 w-2 rounded-full bg-green-600 animate-pulse' />
        )}
        {isActive ? 'Active' : 'Inactive'}
      </p>
    </div>
  );
}

export default ActiveBadge;
