export const GridOVerlay = () => {
  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full">
      <div className="grid h-full w-full grid-cols-3 grid-rows-3">
        {[...Array(2)].map((_, i) => (
          <div
            key={`row-${i}`}
            className="absolute left-0 w-full border-t border-white/50"
            style={{ top: `${(i + 1) * (100 / 3)}%` }}
          />
        ))}
        {[...Array(2)].map((_, i) => (
          <div
            key={`col-${i}`}
            className="absolute top-0 h-full border-l border-white/50"
            style={{ left: `${(i + 1) * (100 / 3)}%` }}
          />
        ))}
      </div>
    </div>
  );
};
