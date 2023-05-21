import { create } from 'zustand'

const orderStore = create((set, get) => ({
  orders: [],
  setOrders: async (orders) => {
    set({ orders: await orders })
  },
}))

export default orderStore