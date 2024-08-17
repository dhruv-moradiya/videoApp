import { Search } from "lucide-react";
import { useLocation, Link, Outlet } from "react-router-dom";

export default function UserDetail() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="px-7 mt-4">
      <div className="flex items-center gap-8">
        <div className="w-36 h-36 overflow-hidden rounded-full">
          <img
            src="https://yt3.googleusercontent.com/yti/ANjgQV_XwL3Ef8eUdDq4JhEHRFELqJx8KOj38MSLtbc9MG6L81g=s88-c-k-c0x00ffffff-no-rj"
            alt=""
            className="w-full h-full rounded-full"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold">User's Name</h2>
          <p className="text-zinc-300">user@gmail.com • 10M Subscribers</p>
          <button className="text-zinc-300">More About this channel</button>
        </div>
      </div>
      <div className="w-full border-b-[1px] border-zinc-100/50 my-6">
        <ul className="flex items-center gap-4">
          <li
            className={`text-zinc-300 font-semibold py-3 mx-4 border-b-[3px] ${
              currentPath === "/user-detail"
                ? "border-zinc-300"
                : "border-transparent"
            } hover:border-zinc-300 cursor-pointer text-[16px]`}
          >
            <Link to="/user-detail">Home</Link>
          </li>
          <li
            className={`text-zinc-300 font-semibold py-3 mx-4 border-b-[3px] ${
              currentPath === "/user-detail/videos"
                ? "border-zinc-300"
                : "border-transparent"
            } hover:border-zinc-300 cursor-pointer text-[16px]`}
          >
            <Link to="/user-detail/videos">Videos</Link>
          </li>
          <li
            className={`text-zinc-300 font-semibold py-3 mx-4 border-b-[3px] ${
              currentPath.includes("/user-detail/search")
                ? "border-zinc-300"
                : "border-transparent"
            } hover:border-zinc-300 cursor-pointer`}
          >
            <Search size={20} />
          </li>
        </ul>
      </div>
      <div className="my-10">
        <Outlet />
      </div>
    </div>
  );
}
