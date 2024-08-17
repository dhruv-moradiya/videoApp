import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData } from "../store/slice/userSlice/userThunk";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage({ userAuth }) {
  if (!userAuth) return null;

  const tabs = ["All", "Music", "Gaming", "History", "News", "Fashion"];

  return (
    <>
      {/* Navbar */}

      {/* Tabs */}
      <div className="flex items-center justify-center gap-4 my-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            className="px-4 py-2 bg-zinc-200 hover:bg-zinc-600 text-black hover:text-white font-semibold rounded-lg cursor-pointer"
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Videos */}
      <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-7 sm:px-10">
        {new Array(10).fill(0).map((_, index) => (
          <div className="w-full flex flex-col gap-2" key={index}>
            <div className="w-full h-[200px] overflow-hidden rounded-lg">
              <img
                src={userAuth.coverImage}
                alt="User Photo"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Uploader */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 overflow-hidden rounded-full">
                <img
                  src={userAuth.avatar}
                  alt="User Photo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">
                  Heading Lorem ipsum dolor sit amet.
                </h3>
                <div className="flex flex-col -gap-1 text-xs font-semibold text-slate-300">
                  <p>Papa Pig</p>
                  <p>10M views • 1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
