import { cn } from "tailwind-cn";

export default function Button({ name, variant, className = "", ...rest }) {
  return (
    <button
      style={{
        background:
          variant !== "host"
            ? "linear-gradient(103.25deg, #0D70BC 28.93%, #88E2E8 98.76%)"
            : "",
      }}
      className={cn(
        `px-8 py-2 rounded-md cursor-pointer transition-all hover:scale-105 ${className}`
      )}
      {...rest}
    >
      {name}
    </button>
  );
}
