import { useMutation } from "react-query";
import pb from "../lib/pocketbase";

export default function useSendMsg() {
  async function send({ message, user_id }) {
    const msgData = await pb
      .collection("messages")
      .create({
        "user_id": user_id,
        "message": message
      });
  }

  return useMutation(send);
}