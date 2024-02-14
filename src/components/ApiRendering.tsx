//write a component for the index file that GET the restaurtant data from the API and set the state to the current values.
//The component should be called ApiRendering and should be a functional component.
//The component should have the following state:
//restaurants: IRestaurant[]
//The component should have the following methods:
// axios GET request to fetch all restaurants from the API and set the state to the current values.
// axios POST request to create a new restaurant and set the state to the current values.

//import { Restaurant } from "../models/Restaurant";


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










// import { useEffect, useState } from "react";
// import { IRestaurant } from "../models/IRestaurant";
// import axios from 'axios';
// import { Restaurant } from "../models/Restaurant";

// function ApiRendering() {

//   const [restaurants, setRestaurants] = useState<IRestaurant[]>([
//     new Restaurant("", {
//       street: "",
//       zip: "",
//       city: ""
//     })
//   ]);


//   const newRestaurantData: IRestaurant = {
//     name: "Happy Dumpling",
//     address: {
//       street: "Malmögatan 8",
//       zip: "54321",
//       city: "Malmö"
//     }
//   };

//   useEffect(() => {
    
//     setRestaurants(prevRestaurants => [...prevRestaurants, newRestaurantData]);

    
//     axios
//       .post("https://school-restaurant-api.azurewebsites.net/restaurant/create", newRestaurantData)
//       .then((response) => {
//         console.log('New restaurant created successfully:', response.data);
//       })
//       .catch((error) => {
//         console.error('Error creating restaurant:', error);
//       });

//       axios
//       .get("https://school-restaurant-api.azurewebsites.net/restaurant/65c6276ee125e85f5e15b79f")
//       .then((response) => {
//         console.log('Get Restaurant', response.data);
//         setRestaurants(response.data || []);
//       })
//       .catch((error) => {
//         console.error('Error fetching restaurants:', error);
//       });
//   }, []);

 
  

//   return (
//     <div>
//       <h1>{newRestaurantData.name}</h1>
     
      
//     </div>
//   );
// }

// export default ApiRendering;