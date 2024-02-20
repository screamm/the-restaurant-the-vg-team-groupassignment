import axios from "axios";
import { useEffect, useState } from "react";
import { IRestaurant } from "../models/IRestaurant";
import hamster from '../graphics/hamster.png';

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
    <div className=" flex place-content-center">
      <ul>
      {restaurants.map((restaurant, index) => {
        return (
        <li key={index}>
          <h1 className=" text-5xl m-4 font-serif tracking-wide flex place-content-center">{restaurant.name}</h1>
          {/* <p className="border-8 border-pink-600">Adress: {restaurant.address} </p>
          <p className="border-8 border-pink-600">{restaurant.zip} {restaurant.city}</p>
          <p className="border-8 border-pink-600">RestaurangID: {restaurant._id} </p> */}

          <img src={ hamster} alt="Hamster eating dumplings" className=" min-h-80 m  "/>
          <h2 className=" text-5xl m-4 font-serif tracking-wide flex place-content-center">Restaurant</h2>
        </li>

          

        );
        })}
    </ul>
            </div>


  );
}