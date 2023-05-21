import { create } from 'zustand'

const useCurrRow = create((set) => ({
    row: {},
    setRow: (row) => {        
        set(() => ({ row }))
    },
}))

export default useCurrRow