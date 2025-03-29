const API_KEY = "px36VNP9quR8iK83kzopBvavCJWxEVwH";
const BASE_URL = "https://mc-api.marketcheck.com/v2";

export const getPopularCars = async () => {
    const response = await fetch(`${BASE_URL}/popular/cars?api_key=${API_KEY}&car_type=new`);
    const data = await response.json();
    return data.results;
};

export const searchCars = async (query) => {
    const response = await fetch(
      `${BASE_URL}/search/car/active?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );
    const data = await response.json();
    return data.results;
};

