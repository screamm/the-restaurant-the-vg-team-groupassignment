import axios from "axios";
import { useEffect, useState } from "react";
import { IRestaurant } from "../models/IRestaurant";

export const ApiRendering = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);

  useEffect(() => {
    axios
      .get("https://school-restaurant-api.azurewebsites.net/restaurant/65c6276ee125e85f5e15b79f")
      .then((response) => {
        console.log('Get Restaurants', response.data);
        setRestaurants(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching restaurants:', error);
      });
  }, []);

  return (
    <div>
      <ul>
      {restaurants.map((restaurant, index) => {
        return (
        <li key={index}>
          <h1>{restaurant.name}</h1>
          <p>{restaurant.address.street}</p>
          <p>{restaurant.address.zip} {restaurant.address.city}</p>
        </li>
        );
        })}
    </ul>
  </div>
  );
}