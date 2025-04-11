import "../css/CarCard.css"
import image from "./image.png"
import { useCarContext } from "../contexts/CarContext"

function CarCard({car}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useCarContext()
    const favorite = isFavorite(car.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(car.id)
        else addToFavorites(car)
    }

    return <div className= "car-card">
        <div className = "car-poster">
            <img src={image} alt={car.title}/>
            <div className="car-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
            </div>
        </div>
        <div className="car-info">
            <h3>{car.Prod_year} {car.Manufacturer} {car.Model}</h3>
            <p>${car.Price}</p>
        </div>
    </div>
}

export default CarCard;