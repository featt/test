import { create } from 'zustand'

const useEdit = create((set, get) => ({
    edit: false,
    setEdit: () => {
        const edit = get().edit;
        set(() => ({ edit: !edit }))
    },
}))

export default useEdit