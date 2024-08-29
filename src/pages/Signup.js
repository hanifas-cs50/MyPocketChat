import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import { useEffect } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { mutate: signup, isLoading, isError, isSuccess } = useSignup();
  
  async function onSignup(data) {
    if(data.password === data.passwordConfirm) {
      signup({ username: data.username, password: data.password, passwordConfirm: data.passwordConfirm });
      reset();
    } else {
      alert("confirm password doesn't match");
    }
  }

  useEffect(() => {
    if (isSuccess) {
      navigate("/home");
    }
  }, [isSuccess, navigate])

  return (
    <>
      <div className="max-w-sm w-full py-6 px-8 mb-4 rounded-3xl bg-zinc-800/50">
        <h1 className="font-sans font-bold text-5xl text-white">
          My<span className="handwriting text-amber-500">PocketChat</span>
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSignup)} className="max-w-sm w-full py-6 px-8 rounded-3xl bg-zinc-800/50">
        <h2 className="mb-4 font-bold text-5xl text-center text-green-500">
          Signup
        </h2>
        <div className="mb-6 space-y-2 text-zinc-300 font-medium">
          <label className="text-lg" htmlFor="username">Username</label>
          <input
            className="w-full p-2 rounded outline-none outline-4 outline-zinc-700 bg-zinc-700/75 focus:outline-zinc-500"
            type="username"
            id="username"
            autoComplete="off"
            maxLength={20}
            {...register("username")}
          />
        </div>
        <div className="mb-8 space-y-2 text-zinc-300 font-medium">
          <label className="text-lg" htmlFor="password">Password</label>
          <input
            className="w-full p-2 rounded outline-none outline-4 outline-zinc-700 bg-zinc-700/75 focus:outline-zinc-500"
            type="password"
            id="password"
            autoComplete="off"
            {...register("password")}
          />
        </div>
        <div className="mb-8 space-y-2 text-zinc-300 font-medium">
          <label className="text-lg" htmlFor="passwordConfirm">Password Confirm</label>
          <input
            className="w-full p-2 rounded outline-none outline-4 outline-zinc-700 bg-zinc-700/75 focus:outline-zinc-500"
            type="password"
            id="passwordConfirm"
            autoComplete="off"
            {...register("passwordConfirm")}
          />
        </div>
        <div className="flex justify-between">
          <Link
            className="py-2 px-6 rounded font-bold  underline text-blue-500 hover:underline-offset-2 hover:text-blue-400 disabled:text-zinc-800/50 disabled:shadow-none disabled:text-blue-900"
            disabled={isLoading}
            to={"/"}
          >
            {
              isLoading ? 
              "Loading" :
              "Login"
            }
          </Link>
          <button
            className="py-2 px-6 rounded font-bold bg-green-500 hover:shadow-lg hover:shadow-green-500/70 hover:text-white disabled:text-zinc-800/50 disabled:shadow-none disabled:bg-green-900"
            type="submit"
            disabled={isLoading}
          >
            {
              isLoading ? 
              "Loading" :
              "Signup"
            }
          </button>
        </div>
      </form>
      {isError && 
        <div className="max-w-sm w-full px-6 py-4 mt-4 rounded-3xl bg-red-500/50">
          <h1 className="font-sans font-bold text-lg text-white">
            Error
          </h1>
        </div>
      }
    </>
  );
};