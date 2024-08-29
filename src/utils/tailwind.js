export const buttonClass = (type) => {
  const baseClass =
    "text-white focus:outline-none w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 disabled:bg-gray-500";
  let typeClass = "";

  switch (type) {
    case "primary":
      typeClass = `bg-blue-700 hover:bg-blue-800 focus:ring-blue-300`;
      break;
    case "warn":
      typeClass = "bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-400";
      break;
    case "outline":
      typeClass =
        "!text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100";
      break;
    default:
      typeClass = "";
      break;
  }

  return `${baseClass} ${typeClass}`;
};
