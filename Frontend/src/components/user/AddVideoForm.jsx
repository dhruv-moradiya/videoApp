import { LinkIcon } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";

export default function AddVideoForm({ setOpenVideoAddModal }) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  async function addVideo(data) {
    console.log(data);
    setOpenVideoAddModal(false);
    reset();
  }

  console.log("errors :>> ", errors);

  return (
    <form
      className="w-full flex flex-col items-center justify-center gap-6"
      onSubmit={handleSubmit(addVideo)}
    >
      <h2 className="text-xl">Add Video</h2>
      <div className="w-full">
        <label htmlFor="name" className="text-base">
          Video Name
        </label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: { value: true, message: "Video name is required" },
          })}
        />
        {errors && errors.name && (
          <p className="text-red-500 font-bold text-xs">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="w-full">
        <label htmlFor="description" className="text-base">
          Video Description
        </label>
        <Input
          type="text"
          id="description"
          {...register("description", {
            required: { value: true, message: "Video Description is required" },
          })}
        />
        {errors && errors.description && (
          <p className="text-red-500 font-bold text-xs">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="w-full">
        <div className="w-full flex flex-col gap-1 border-[1px] border-white px-3 py-1 text-base rounded-md">
          <label
            htmlFor="thumbnail"
            className="flex items-center gap-3 cursor-pointer"
          >
            <span>
              <LinkIcon color="white" />
            </span>
            <span>Thumbnail</span>
          </label>
          <Input
            type="file"
            id="thumbnail"
            className="hidden"
            accept="image/*"
            {...register("thumbnail", {
              required: { value: true, message: "Thumbnail is required" },
            })}
          />
        </div>
        {errors && errors.thumbnail && (
          <p className="text-red-500 font-bold text-xs">
            {errors.thumbnail.message}
          </p>
        )}
      </div>

      <div className="w-full">
        <div className="w-full flex flex-col gap-1 border-[1px] border-white px-3 py-1 text-base rounded-md">
          <label
            htmlFor="video"
            className="flex items-center gap-3 cursor-pointer"
          >
            <span>
              <LinkIcon color="white" />
            </span>
            <span>Video</span>
          </label>
          <Input
            type="file"
            id="video"
            className="hidden"
            accept="video/*"
            {...register("video", {
              required: { value: true, message: "Video is required" },
            })}
          />
        </div>
        {errors && errors.video && (
          <p className="text-red-500 font-bold text-xs">
            {errors.video.message}
          </p>
        )}
      </div>
      <div className="flex gap-3">
        <Button className="!bg-slate-500 " name={"Add"} />
        <Button
          className="!bg-red-500 "
          name={"Cancel"}
          variant={"host"}
          onClick={() => setOpenVideoAddModal(false)}
        />
      </div>
    </form>
  );
}
