export default function Button({ name, className = "", ...rest }) {
  return (
    <button
      className="px-8 py-2 rounded-md cursor-pointer transition-all hover:scale-105"
      style={{
        background:
          "linear-gradient(103.25deg, #0D70BC 28.93%, #88E2E8 98.76%)",
      }}
      {...rest}
    >
      {name}
    </button>
  );
}
