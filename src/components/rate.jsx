import clsx from "clsx";

export const Rate = (props) => {
  const { percentage, className } = props;

  return (
    <div className="relative w-full h-7 bg-[#0000001a] rounded-md">
      <div
        className={clsx(
          `absolute min-w-fit h-full flex items-center px-2 justify-end rounded-md`,
          className
        )}
        style={{
          width: `${percentage}%`
        }}
      >
        {percentage} %
      </div>
    </div>
  );
};
