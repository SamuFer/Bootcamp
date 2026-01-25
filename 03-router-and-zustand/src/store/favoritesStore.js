import { create } from 'zustand'

//const sum = (a, b) => a + b // funcion implicita
//const sum = (a, b) => { return a + b } // funcion explicita

export const useFavoritesStore = create((set,get) => ({ //set=> to update state y get=> to read state   
    // State
    favorites: [],  

    clearFavorites: () => {
        //setear el estado de favoritos a un array vacio
        set({ favorites: [] })
    },

    // Actions
    addFavorite: (jobId) => {
        set((state) => ({
            favorites: state.favorites.includes(jobId) 
                ? state.favorites
                :[...state.favorites, jobId]
        }))
    },

    removeFavorite: (jobId) => {
        set((state) => ({
            favorites: state.favorites.filter(id => id !== jobId)
        }))
    },

    isFavorite: (jobId) => {
        return get().favorites.includes(jobId)
    },

    toggleFavorite: (jobId) => {
        const { isFavorite, addFavorite, removeFavorite } = get()
        const isFav = isFavorite(jobId)
        isFav ? removeFavorite(jobId) : addFavorite(jobId)
    },
    // New action to count favorites
    countFavorites: () => get().favorites.length
    
}))