import pb from "../lib/pocketbase";

export default function useLogout() {
  function logout() {
    pb.authStore.clear();
  }
  return logout;
}