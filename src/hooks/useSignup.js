import { useMutation } from "react-query";
import pb from "../lib/pocketbase";

export default function useSignup() {
  async function signup({ username, password, passwordConfirm }) {
    const data = {
      username,
      password,
      passwordConfirm,
    };
    const createAuthData = await pb
      .collection("users")
      .create(data);
    const authData = await pb
      .collection("users")
      .authWithPassword(username, password);
  }

  return useMutation(signup);
}