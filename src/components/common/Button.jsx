import clsx from "clsx";

const baseStyles = "flex items-center w-full p-2 text-sm font-medium rounded-md transition-colors cursor-pointer";

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-gray-200",
  outline: "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  secondary: "bg-[#1E293B] hover:bg-[#334155] text-gray-200 border border-blue-600",
  disabed: "bg-[#475569] text-gray-400 cursor-not-allowed",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
