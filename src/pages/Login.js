import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { mutate: login, isLoading, isError, isSuccess } = useLogin();
  
  async function onLogin(data) {
    login({ username: data.username, password: data.password });
    reset();
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
      <form onSubmit={handleSubmit(onLogin)} className="max-w-sm w-full py-6 px-8 rounded-3xl bg-zinc-800/50">
        <h2 className="mb-4 font-bold text-5xl text-center text-blue-500">
          Login
        </h2>
        <div className="mb-6 space-y-2 text-zinc-300 font-medium">
          <label className="text-lg" htmlFor="username">Username</label>
          <input
            className="w-full p-2 rounded outline-none outline-4 outline-zinc-700 bg-zinc-700/75 focus:outline-zinc-500"
            type="text"
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
        <div className="flex justify-between">
          <Link
            className="py-2 px-6 rounded font-bold underline text-green-500 hover:underline-offset-2 hover:text-green-400 disabled:text-zinc-800/50 disabled:text-green-900"
            disabled={isLoading}
            to={"/signup"}
          >
            {
              isLoading ? 
              "Loading" :
              "Signup"
            }
          </Link>
          <button
            className="py-2 px-6 float-right rounded font-bold bg-blue-500 hover:shadow-lg hover:shadow-blue-500/70 hover:text-white disabled:text-zinc-800/50 disabled:shadow-none disabled:bg-blue-900"
            type="submit"
            disabled={isLoading}
          >
            {
              isLoading ? 
              "Loading" :
              "Login"
            }
          </button>
        </div>
      </form>
      {isError && 
        <div className="max-w-sm w-full px-6 py-4 mt-4 rounded-3xl bg-red-500/50">
          <h1 className="font-sans font-bold text-lg text-white">
            Invalid credentials
          </h1>
        </div>
      }
    </>
  );
};