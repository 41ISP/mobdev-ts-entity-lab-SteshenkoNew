import { create } from "zustand"
import type { IStrapiResponse, IToilet, TToiletInput } from "./types"
import { api } from "../api"

interface IToiletStore {
    toilets: IStrapiResponse<IToilet[]> | undefined
    getToilets: () => Promise<void>
    createToilet: (input: TToiletInput) => Promise<void>
    deleteToilet: (documentId: string) => Promise<void>
}

export const useToiletsStore = create<IToiletStore>((set, get) => ({
    toilets: undefined,

    getToilets: async () => {
        try {
            const res = await api.getToilets()
            set({ toilets: res })
        } catch (error) {
            console.error(error)
            throw error
        }
    },
    createToilet: async (input) => {
        try {
            await api.createToilet(input)
            await get().getToilets()
        } catch (error) {
            console.error(error)
            throw error
        }
    },
    deleteToilet: async (documentId) => {
        try {
            await api.deleteToilet(documentId)
            await get().getToilets()
        } catch (error) {
            console.error(error)
            throw error
        }
    },
}))