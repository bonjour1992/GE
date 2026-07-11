
import { create } from 'zustand'
import { getElement, getRemp, getSearch, getList } from "./fetch.js";


export const useRemp = create((set) => ({
  remp: [],
  setRemp: (r) => set({ remp: r })
}))



export let search
search = search || await getSearch("ti5")

