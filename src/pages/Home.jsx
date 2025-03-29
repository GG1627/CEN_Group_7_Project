import CarCard from "../components/CarCard.jsx";
import {useState, useEffect} from "react";
import { searchCars, getPopularCars } from "../services/api.js";
import NavBar from "../components/NavBar.jsx";
import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    //PROBLEM!!!!
    //const [cars, setCars] = useState([]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //PROBLEMATIC CODE HERE!!!!!!!! ALSO CHECK api.js

    // useEffect(() => {
    //     const loadPopularCars = async () => {
    //         try {
    //             const popularCars = await getPopularCars();
    //             setCars(popularCars);
    //         } catch (err) {
    //             console.log(err);
    //             setError("Failed to load cars...");
    //         }
    //         finally {
    //             setLoading(false);
    //         }
    //     };

    //     loadPopularCars();
    // }, []);


    const cars = [
        {id: 1, title: "Toyota", release_date: "2025"},
        {id: 2, title: "Toyota", release_date: "2025"},
        {id: 3, title: "Toyota", release_date: "2025"},

    ];

    const handleSearch = (e) => {
        e.preventDefault()
        alert(searchQuery)
    };

    return (
      <div>
        <NavBar />
        <div className="home">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search for cars..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>

            {error && <div className="error-message">{error}</div>}

          {/* {loading ? (
            <div className="loading">Loading...</div>
          ) : ( */}
            <div className="cars-grid">
              {cars.map((car) => (
                <CarCard car={car} key={car.id} />
              ))}
            </div>
          {/* )} */}
        </div>
      </div>
    );
};

export default Home;