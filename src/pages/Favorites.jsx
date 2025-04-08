import NavBar from "../components/NavBar";
import "../css/Favorites.css";
import { useCarContext } from "../contexts/CarContext";
import CarCard from "../components/CarCard";

function Favorites() {
    const {favorites} = useCarContext();

    if (favorites) {
        return (
          <div>
            <NavBar />
            <div className="favorites">
              <h2>Your Favorite Cars!</h2>
              <div className="cars-grid">
                {favorites.map((car) => (
                  <CarCard car={car} key={car.id} />
                ))}
              </div>
            </div>
          </div>
        );
    }

    return (
    <div>
    <NavBar/>
        <div className="favorites-empty">
            <h2>No Favorite Cars Yet</h2>
            <p>Start adding cars to your favorites and they will appear here!</p>
        </div>
    </div>
    )
};

export default Favorites;