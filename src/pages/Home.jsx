
import CarCard from "../components/CarCard.jsx";
import {useState, useEffect, useCallback} from "react";
import { ref, onValue, get } from "firebase/database";
import { database } from "../firebase/firebaseConfig.js";
import NavBar from "../components/NavBar.jsx";
import "../css/Home.css";



function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [cars, setCars] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [numberOfCarsToShow, setNumberOfCarsToShow] = useState(16);

    //Grabs Realtime Database
    useEffect(() => {
      const carsRef = ref(database);
      get(carsRef).then((snapshot) => {
        if (snapshot.exists()) {
          const carsArray = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data,
          }));
          //.slice(0, numberOfCarsToShow)
          setCars(carsArray);
        } else {
          console.log('No data available');
        }
      }).catch((error) => {
        console.error(error);
      });
        
    }, []);


    //SEARCH FUNCTION
    const handleSearch = (e) => {
      const query = e.target.value;
      setSearchQuery(e.target.value);
      if (query.length === 0) {
        setNumberOfCarsToShow(16);
      }
      else if (query.length > 0) { 
        setNumberOfCarsToShow(1000);
      }
      
    };

    const concatenateKeys = (car) => {
      const combinedKey = `${car.Prod_year} ${car.Manufacturer} ${car.Model}`;
      return combinedKey;
    }

    console.log(cars);
    //JSX
    return (
      <div>
        <NavBar />
        <div className="home"> 
          <form className="search-form">
            <input
              type="text"
              placeholder="Search for cars..."
              className="search-input"
              value={searchQuery}
              onChange={handleSearch}
            />
            {/* <button type="submit" className="search-button">
              Search
            </button> */}
          </form>

          {error && <div className="error-message">{error}</div>}

          <div className="cars-grid">
            {cars.slice(0, numberOfCarsToShow).filter((car) => {
              return searchQuery.toLowerCase() === '' ? car : concatenateKeys(car).toLowerCase().includes(searchQuery.toLowerCase())
              // car.Manufacturer.toLowerCase().includes(searchQuery) 
              // || car.Model.toString().toLowerCase().includes(searchQuery)
            }).map((car) => (
              <CarCard car={car} key={car.id} />
            ))}
          </div>
        </div>
      </div>
    );
};

export default Home;