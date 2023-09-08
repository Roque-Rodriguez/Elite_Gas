import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import CustomerServiceHome from "./CustomerServiceHome";
import CustomerHome from "./CustomerHome";
import SalesHome from "./SalesHome";

import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      //This fetches the cars of the logged in user. Use the views.py in cars app as an example
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setCars(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchCars();
  }, [token]);

    if(user.is_cs === true){
      return <CustomerServiceHome/>
   } else if(user.is_sales === true){
      return <SalesHome/>
   } else if(user.is_customer === true){
      return <CustomerHome/>
   }


  // if(user.is_customer === true){
  //   <button>Pay bill</button>
  // }else{
  //   <h1></h1>
  // }

  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
      {cars &&
        cars.map((car) => (
          <p key={car.id}>
            {car.year} {car.model} {car.make}
          </p>
        ))}
    </div>
  );
};

export default HomePage;
