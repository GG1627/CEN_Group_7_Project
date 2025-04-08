import {createContext, useState, useContext, useEffect} from "react"

const CarContext = createContext()

export const useCarContext = () => useContext(CarContext)

export const CarProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])
    
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")

        if (storedFavs) setFavorites(JSON.parse(storedFavs))
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (car) => {
        setFavorites(prev => [...prev, car])
    }

    const removeFromFavorites = (carId) => {
        setFavorites(prev => prev.filter(car => car.id !== carId))
    }

    const isFavorite = (carId) => {
        return favorites.some(car => car.id === carId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <CarContext.Provider value={value}>
        {children}
    </CarContext.Provider>
}