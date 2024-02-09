import { useEffect, useState } from "react";
import "./App.css";
import { IRestaurant } from "./models/IRestaurant";
import axios from 'axios';

function App() {

  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
    
  useEffect(() => {
    axios
      .get("https://school-restaurant-api.azurewebsites.net/" )
      .then((response) => {
        console.log(response.data);
        setRestaurants(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching restaurants:', error);
      });
  }, []);

  return (
    <div>
      <h1>Restaurant Page</h1>
      
    </div>
  );
}

export default App;