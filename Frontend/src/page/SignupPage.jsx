import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, LinkIcon } from "lucide-react";
import { EmailREGEX, PasswordREGEX } from "../constants";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

// 12We<>asas

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [avatarFileName, setAvatarFileName] = useState("");
  const [coverImageFileName, setCoverImageFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  async function createUserAccount(data) {
    setIsLoading(true);
    const URL = import.meta.env.VITE_APP_BASE_URL + "/api/v1/users/register";

    const formData = new FormData();
    formData.append("firstName", data.name);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.avatar[0]) {
      const file = new File([data.avatar[0]], "avatar.jpg", {
        type: "image/jpeg",
      });
      formData.append("avatar", file);
    }

    if (data.coverImage[0]) {
      const file = new File([data.coverImage[0]], "coverImage.jpg", {
        type: "image/jpeg",
      });
      formData.append("coverImage", file);
    }
    console.log("formData :>> ", formData);
    try {
      const response = await fetch(URL, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.status !== 201) {
        toast.error(result.message || "Something went wrong, please try again");
      } else {
        toast.success(result.message || "User created successfully");
        reset();
        console.log("data :>> ", result);
      }
    } catch (error) {
      console.error("error :>> ", error);
      toast.error("Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  }

  function navigateToSignInPage() {
    navigate("/signin");
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4 px-4 sm:px-0">
      <Toaster position="top-left" reverseOrder={false} />
      <h2 className="text-2xl">Sign Up with VIDEO APP</h2>
      <form
        className="lg:w-1/3 flex flex-col items-center gap-4"
        onSubmit={handleSubmit(createUserAccount)}
      >
        {/* Name and User name */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="name" className="text-base">
              Name
            </label>
            <Input
              type="text"
              id="name"
              {...register("name", {
                required: { value: true, message: "Name is required" },
                minLength: {
                  value: 4,
                  message: "Name must contains 4 character",
                },
              })}
            />
            {errors && errors.name && (
              <p className="text-red-500 font-bold text-xs">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="username">User name</label>
            <Input
              type="text"
              id="username"
              {...register("username", {
                required: { value: true, message: "Username is required" },
                minLength: {
                  value: 6,
                  message: "Username must contains 6 character",
                },
                validate: {
                  isLowercase: (value) =>
                    value === value.toLowerCase() ||
                    "Username must be in lowercase",
                },
              })}
            />
            {errors && errors.username && (
              <p className="text-red-500 font-bold text-xs">
                {errors.username.message}
              </p>
            )}
          </div>
        </div>
        {/* Email */}
        <div className="self-start w-full sm:w-1/2 sm:pr-4">
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            id="email"
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: EmailREGEX,
                message: "Invalid email address",
              },
            })}
          />
          {errors && errors.email && (
            <p className="text-red-500 font-bold text-xs">
              {errors.email.message}
            </p>
          )}
        </div>
        {/* Avatar and Cover Image */}
        <div className="w-full flex flex-col items-center justify-center gap-4 my-2">
          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="avatar"
              className="flex items-center gap-3 cursor-pointer"
            >
              <span>
                <LinkIcon color="white" />
              </span>
              <span>Avatar</span>
            </label>
            <Input
              type="file"
              id="avatar"
              className="hidden"
              accept="image/*"
              {...register("avatar", {
                required: { value: true, message: "Avatar is required" },
                onChange: () => {
                  setAvatarFileName(getValues("avatar")[0].name);
                },
              })}
            />
            {avatarFileName && (
              <p className="text-gray-500 text-xs">
                Selected file: {avatarFileName}
              </p>
            )}
            {errors.avatar && (
              <p className="text-red-500 font-bold text-xs">
                {errors.avatar.message}
              </p>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="coverImage"
              className="flex items-center gap-3 cursor-pointer"
            >
              <span>
                <LinkIcon color="white" />
              </span>
              <span>Cover Image</span>
            </label>
            <Input
              type="file"
              id="coverImage"
              className="hidden"
              accept="image/*"
              {...register("coverImage", {
                onChange: () => {
                  setCoverImageFileName(getValues("avatar")[0].name);
                },
              })}
            />
            {coverImageFileName && (
              <p className="text-gray-500 text-xs">
                Selected file: {coverImageFileName}
              </p>
            )}
            {errors && errors.coverImage && (
              <p className="text-red-500 font-bold text-xs">
                {errors.coverImage.message}
              </p>
            )}
          </div>
        </div>
        {/* Password and Confirm Password */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <div className="flex items-center border-[1px] border-white rounded-md px-3">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                className="border-none px-0 focus:outline-none"
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                  pattern: {
                    value: PasswordREGEX,
                    message:
                      "Password must contain at least one letter, one number, and one special character.",
                  },
                })}
              />
              {showPassword ? (
                <EyeOff onClick={() => setShowPassword(false)} />
              ) : (
                <Eye onClick={() => setShowPassword(true)} />
              )}
            </div>
            {errors && errors.password && (
              <p className="text-red-500 font-bold text-xs">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="confirm_password">Confirm Password</label>
            <div className="flex items-center border-[1px] border-white rounded-md px-3">
              <Input
                type={showPassword ? "text" : "password"}
                id="confirm_password"
                className="border-none px-0 focus:outline-none"
                {...register("confirm_password", {
                  required: {
                    value: true,
                    message: "Confirm password is required",
                  },
                  validate: {
                    isPasswordMatch: (value) =>
                      value === getValues("password") ||
                      "Confirm password does not match.",
                  },
                })}
              />
              {showPassword ? (
                <EyeOff onClick={() => setShowPassword(false)} />
              ) : (
                <Eye onClick={() => setShowPassword(true)} />
              )}
            </div>
            {errors && errors.confirm_password && (
              <p className="text-red-500 font-bold text-xs">
                {errors.confirm_password.message}
              </p>
            )}
          </div>
        </div>

        <Button
          name={isLoading ? <BeatLoader color="#FFF" size={10} /> : "Submit"}
          type="submit"
        />
      </form>
      <h3>- Or -</h3>
      <Button name="Sign In" onClick={navigateToSignInPage} />
    </div>
  );
}
