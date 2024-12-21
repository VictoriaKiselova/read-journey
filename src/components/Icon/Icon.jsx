const Icon = ({
  sprite,
  id,
  width = "28px",
  height = "28px",
  className,
  onClick,
}) => {
  return (
    <svg width={width} height={height} className={className} onClick={onClick}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );
};

export default Icon;
