import NavBar from "../components/NavBar";
import "../css/Favorites.css";

function Favorites() {
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