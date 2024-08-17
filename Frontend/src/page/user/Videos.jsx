import { Delete, Play, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Videos() {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 10000);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-7 mt-5 sm:px-10 place-content-center">
      {new Array(10).fill(0).map((_, index) => (
        <Video isLoading={isLoading} key={index} />
      ))}
    </div>
  );
}

function Video({ isLoading }) {
  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-2">
        <div className="bg-zinc-800 w-full h-36 overflow-hidden rounded-lg animate-pulse"></div>
        <div className="flex flex-col gap-1">
          <h2 className="bg-zinc-800 w-full h-4 rounded-lg animate-pulse"></h2>
          <p className="bg-zinc-800 w-full h-4 rounded-lg animate-pulse"></p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2 cursor-pointer group relative">
      <div className="w-full h-36 overflow-hidden rounded-lg">
        <img
          src="https://yt3.googleusercontent.com/yti/ANjgQV_XwL3Ef8eUdDq4JhEHRFELqJx8KOj38MSLtbc9MG6L81g=s88-c-k-c0x00ffffff-no-rj"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="leading-tight">
          Lorem ipsum dolor sit amet consectetur.
        </h2>
        <p className="text-zinc-300 text-xs font-semibold">
          3 days ago • 10M views
        </p>
      </div>
      <div className="hidden absolute inset-0 bg-black/50 group-hover:flex items-center justify-center gap-4">
        <button>
          <Play />
        </button>
        <button className="text-zinc-300 font-semibold">
          <Trash2 />
        </button>
      </div>
    </div>
  );
}
