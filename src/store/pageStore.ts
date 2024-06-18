import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PageStore {
  viewStyle: string
  sortedContent: string
  setViewStyle: (style: string) => void
  setSortedContent: (content: string) => void
}

const createPageStore = (name: string) =>
  create(
    persist<PageStore>(
      (set) => ({
        viewStyle: 'gallery',
        sortedContent: 'latest',
        setViewStyle: (style: string) => set({ viewStyle: style }),
        setSortedContent: (content: string) => set({ sortedContent: content }),
      }),
      { name: `${name}_page_state` },
    ),
  )

export const useBlogPageStore = createPageStore('blog')
export const useProjectPageStore = createPageStore('project')
