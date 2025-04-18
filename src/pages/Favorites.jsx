import NavBar from "../components/NavBar";
import "../css/Favorites.css";
import { useCarContext } from "../contexts/CarContext";
import { useAuth } from "../auth";
import CarCard from "../components/CarCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../firebase/auth";

function Favorites() {
  const { favorites } = useCarContext();
  const { currentUser, userLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/");
    }
  }, [userLoggedIn, navigate]);

  const handleLogout = async () => {
    await doSignOut();
    navigate("/");
  };

  const emailUsername = currentUser?.email.split("@")[0];
  const capitalizedUsername = emailUsername
    ? `${emailUsername.charAt(0).toUpperCase() + emailUsername.slice(1)}'s`
    : "";

  return (
    <div className="favorites-page">
      <NavBar />
      {favorites && favorites.length > 0 ? (
        <div className="favorites">
          <h2>{capitalizedUsername} Favorite Cars!</h2>
          <div className="cars-grid">
            {favorites.map((car) => (
              <CarCard car={car} key={car.id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="favorites-empty">
          <h2>No Favorite Cars Yet</h2>
          <p>Start adding cars to your favorites and they will appear here!</p>
        </div>
      )}
    </div>
  );
}

export default Favorites;
