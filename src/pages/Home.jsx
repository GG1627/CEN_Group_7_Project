
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
    const numberOfCarsToShow = 16;
    
    useEffect(() => {
      const carsRef = ref(database);
      get(carsRef).then((snapshot) => {
        if (snapshot.exists()) {
          const carsArray = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data,
          }));
          
          setCars(carsArray.slice(0, numberOfCarsToShow));
        } else {
          console.log('No data available');
        }
      }).catch((error) => {
        console.error(error);
      });
        
    }, []);


    //PROBLEM!!!
    const handleSearch = () => {
    
      // const debounce = (func, delay) => {
      //   let timeoutId;
      //   return (...args) => {
      //     clearTimeout(timeoutId);
      //     timeoutId = setTimeout(() => func(...args), delay);
      //   };
      // };

      // const dealSearch = useCallback(
      //   debounce((query) => {
      //     if (query.trim() === "") {
      //       setSearchQuery([]);
      //     } else {
      //       const results = carsArray.filter((item) =>
      //         item.Manufacturer.toLowerCase().includes(query.toLowerCase())
      //       );
      //       setSearchQuery(results);
      //     }
      //   }, 300),
      //   []
      // );

      // useEffect(() => {
      //   dealSearch(searchQuery);
      // }, [searchQuery, dealSearch]);

      // const handleInputChange = (e) => {
      //   setCars(e.target.value);
      // };


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