import "../css/CarCard.css"
import sedan from "./sedan.png"
import hatchback from "./hatchback-car-silhouette-vector.png"
import jeep from "./Jeep-Silhouette.png"
import microbus from "./minivan-bus.png"
import coupe from "./coupe.png"
import cabriolet from "./cabriolet.png"
import goodswagon from "./goodswagon.png"
import minivan from "./minivan.png"
import universal from "./universal.png"
import pickup from "./pickup.png"
import limo from "./limousine.png"
import { useCarContext } from "../contexts/CarContext"

function CarCard({car}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useCarContext()
    const favorite = isFavorite(car.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(car.id)
        else addToFavorites(car)
    }

    const CarImage = ({car}) => {
        if (car.Category === 'Sedan') {
            return sedan
        }
        if (car.Category === 'Hatchback') {
            return hatchback
        }
        if (car.Category === 'Jeep') {
            return jeep
        }
        if (car.Category === 'Microbus') {
            return microbus
        }
        if (car.Category === 'Coupe') {
            return coupe
        }
        if (car.Category === 'Cabriolet') {
            return cabriolet
        }
        if (car.Category === 'Goods wagon') {
            return goodswagon
        }
        if (car.Category === 'Minivan') {
            return minivan
        }
        if (car.Category === 'Universal') {
            return universal
        }
        if (car.Category === 'Pickup') {
            return pickup
        }
        if (car.Category === 'Limousine') {
            return limo
        }
    }

    return <div className= "car-card">
        <div className = "car-poster">
            <img src={CarImage({car})} alt={car.title}/>
            <div className="car-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
            </div>
        </div>
        <div className="car-info">
            <h2>{car.Prod_year} {car.Manufacturer} {car.Model}</h2>
            <h3>${Math.abs(car.Price)} | {car.Mileage} MI </h3>
            <p1>{car.Color} {car.Category} | {car.Doors} Doors | {car['Drive wheels']}-Wheel Drive</p1>
            <p1>{car.Airbags} Airbags</p1>
            <p1>{car.Cylinders} Cylinders | {car['Fuel type']} | {car['Engine volume']} | {car['Gear box type']} </p1>
            <p1>Leather Interior: {car['Leather interior']}</p1>
        </div>
    </div>
}

export default CarCard;