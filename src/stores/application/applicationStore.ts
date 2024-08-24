import { create } from 'zustand'

interface ApplicationState {
  pageTitle: string
  setPageTitle: (title: string) => void
}

const useApplicationStore = create<ApplicationState>((set) => ({
  pageTitle: '',
  setPageTitle: (title) => set({ pageTitle: title }),
}))

export default useApplicationStore
