import { useState } from "react";
import AddVideoForm from "../../components/user/AddVideoForm";

export default function Home() {
  const [openVideoAddModal, setOpenVideoAddModal] = useState(false);
  return (
    <div className="">
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 my-20">
        <h1 className=" font-semibold text-[16px]">
          Create content on any device
        </h1>
        <div className="flex flex-col items-center text-zinc-300 text-[15px]">
          <span>Upload and record at home or on the go.</span>
          <span>Everything that you make public will appear here.</span>
        </div>
        <button
          className="my-10 border-[1px] border-zinc-300 py-2 px-4 rounded-lg text-[12px] font-bold"
          onClick={() => setOpenVideoAddModal(true)}
        >
          Add Videos
        </button>
      </div>
      {openVideoAddModal && (
        <div className="w-[calc(50%-80px)] fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-zinc-900 shadow-white p-10 rounded-lg">
          <AddVideoForm setOpenVideoAddModal={setOpenVideoAddModal} />
        </div>
      )}
    </div>
  );
}
