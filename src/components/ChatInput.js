import { useForm } from "react-hook-form";
import useSendMsg from "../hooks/useSendMsg";

export default function ChatInput({ userData }) {
  const { register, handleSubmit, reset } = useForm();
  const { mutate: sendMsg, isLoading, isError } = useSendMsg();

  async function onSend(data) {
    console.log(data);
    sendMsg({ user_id: userData, message: data.message});
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSend)} className="flex flex-none" id="input_container">
      <input
        className="w-full py-1.5 px-2 outline-none bg-zinc-700"
        type="text"
        id="input_chat"
        autoComplete="off"
        maxLength={200}
        {...register("message")}
      />
      <button
        className="py-1.5 px-4 font-bold text-sm text-zinc-800 bg-blue-500 hover:text-white"
        type="submit"
        disabled={isLoading || userData === "anon"}
      >
          {
            isLoading ? 
            "Loading" :
            "Send"
          }
        </button>
    </form>
  )
};