import { create } from "zustand";
import ApiService from "../service/api";

export const useUserStore = create((set, get) => ({
  user: {},
  setCurrentUser: (user) => {
    set({ user });
  },
  getCurrentUser: () => {
    const { user } = get();
    return user;
  },
  // setCurrentUser: async () => {
  //   const res = await ApiService.callFetchAccount();
  //   if (res.status === 200) {
  //     return set({ user: res.data.data.user });
  //   }
  // },
  // getCurrentUser: async () => {
  //   const { user, setCurrentUser } = get();
  //   if (Object.keys(user).length === 0) {
  //     // console.log("Fetching current user...");

  //     await setCurrentUser();
  //     return user;
  //   }
  //   return user;
  // },
}));
