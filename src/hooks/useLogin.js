import { useMutation } from "react-query";
import pb from "../lib/pocketbase";

export default function useLogin() {
  async function login({ username, password }) {
    const authData = await pb
      .collection("users")
      .authWithPassword(username, password);
  }

  return useMutation(login);
}