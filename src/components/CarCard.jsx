import "../css/CarCard.css"

function CarCard({car}) {

    function onFavoriteClick() {
        alert("clicked")
    }

    return <div className= "car-card">
        <div className = "car-poster">
            <img src={car.url} alt={car.title}/>
            <div className="car-overlay">
                <button className="favorite-btn" onClick={onFavoriteClick}>
                    ♥
                </button>
            </div>
        </div>
        <div className="car-info">
            <h3>{car.title}</h3>
            <p>{car.release_date}</p>
        </div>
    </div>
}

export default CarCard;