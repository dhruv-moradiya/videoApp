import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { EmailREGEX } from "../constants";
import { BeatLoader } from "react-spinners";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  async function logInUser(data) {
    setIsLoading(true);
    console.log("data :>> ", data);
    const URL =
      import.meta.env.VITE_APP_BASE_URL +
      import.meta.env.VITE_APP_USER_ENDPOINT +
      "/login";

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();
      console.log("result :>> ", result);

      if (!response.ok) {
        toast.error(result.message || "Something went wrong, please try again");
        return;
      } else {
        toast.success(result.message || "User Logged in successfully");
        localStorage.setItem(
          "userAuth",
          JSON.stringify({
            accessToken: result.accessToken,
            userId: result.userId,
          })
        );

        navigate("/");
        reset();
      }
    } catch (error) {
      console.error("error :>> ", error);
      toast.error("Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  }

  function navigateToSignUpPage() {
    navigate("/signup");
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4 px-4 sm:px-0">
      <Toaster position="top-left" reverseOrder={false} />
      <h2 className="text-2xl">Sign In with VIDEO APP</h2>
      <form
        className="lg:w-1/3 flex flex-col items-center gap-4"
        onSubmit={handleSubmit(logInUser)}
      >
        {/* Email */}
        <div className="self-start w-full">
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
      <Button name="Sign Up" onClick={navigateToSignUpPage} />
    </div>
  );
}
