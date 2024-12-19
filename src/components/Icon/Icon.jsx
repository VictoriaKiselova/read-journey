const Icon = ({ sprite, id, width = "28px", height = "28px", className }) => {
  return (
    <svg width={width} height={height} className={className}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );
};

export default Icon;
