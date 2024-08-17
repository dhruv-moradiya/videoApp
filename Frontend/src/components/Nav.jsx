import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Nav({ userAuth }) {
  const navigate = useNavigate();
  if (!userAuth) return null;
  return (
    <>
      <div className="w-full flex items-center justify-between px-8 py-3">
        <h2 className="text-2xl font-semibold">Video App</h2>
        <div className="w-[350px] flex items-center gap-2 border-[1px] border-slate-100 rounded-md px-2 py-2">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent focus:outline-none"
          />
          <Search />
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 overflow-hidden rounded-full"
            onClick={() => navigate("/userDetail")}
          >
            <img
              src={userAuth.avatar}
              alt="User Photo"
              className="w-full h-full object-cover"
            />
          </div>
          <p>Hello {userAuth.firstName}</p>
        </div>
      </div>
    </>
  );
}
