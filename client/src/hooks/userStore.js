import { create } from 'zustand'

const userStore = create((set, get) => ({
  users: [],
  setUsers: async (users) => {
    set({ users: await users })
  },
}))

export default userStore