import React, { useEffect, useState } from "react";
import { Client } from "@petfinder/petfinder-js";
import "./App.css";

import { FaPhone, FaFacebook } from "react-icons/fa";
import logo from "./assets/logo.svg";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  var client = new Client({
    apiKey: import.meta.env.VITE_PETFINDER_KEY,
    secret: import.meta.env.VITE_SECRET,
  });

  if (loading) {
    client.animal
      .search({
        type: "Dog",
        organization: import.meta.env.VITE_ORG_ID,
        page: 1,
        limit: 20,
      })
      .then((resp) => {
        setData(resp.data.animals);
        setLoading(false);
      });
  }

  return (
    <>
      <div class="bg-light">
        <header class="my-2 w-full">
          <div class="mw-1/2 d:w-1/3 max-w-100 mx-auto">
            <img src={logo} />
            <h1 class="font-merienda text-primary text-shadow-xs text-shadow-gray-800 font-bold text-1xl md:text-2xl lg:text-4xl">
              Promway Rescue
            </h1>
          </div>
        </header>

        <hr className="my-8" />

        <div class="max-w-6xl px-4 mx-auto text-center mt-8">
          <h1 className="font-merienda text-2xl font-bold mb-4 text-primary">
            About Us
          </h1>
          <p class="pb-2">
            Promway Rescue, Inc exists to provide shelter and one-on-one
            specialized care for in-need companion animals from local animal
            welfare organizations and to ENSURE permanency in a good home.
          </p>
          <p class="pb-2">
            Promway Rescue was born out of Bill Novotny’s love of helping Stark
            County Animals in need. We are happy to now be one of Stark County’s
            official rescues! Having always helped house rescue dogs at Promway
            Kennels, we are now happy to be an official rescue so that we can do
            even more to help more dogs in Stark County.
          </p>
        </div>

        <hr className="my-8" />
        <div className="mx-auto max-w-2xl px-4 pt-2 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="font-merienda text-2xl font-bold mb-4 text-primary">
            Available Dogs
          </h1>
          {loading ? (
            <h1 class="text-warning text-2xl animate-bounce">Loading...</h1>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {data.map((animal) => (
                <a
                  key={animal.id}
                  href={animal.url}
                  class="group relative border border-gray-200 rounded-t-md shadow-xl bg-gray-100"
                >
                  {animal.photos.length > 0 && (
                    <img
                      src={animal.photos[0].full}
                      alt={animal.name}
                      className="aspect-square w-full shadow-md rounded-t-xs bg-blue-500 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                    />
                  )}
                  <div class="p-2">
                    <h3 class="font-merienda text-primary text-xl mt-2">
                      {animal.name}
                    </h3>
                    <p class="text-lg text-gray-900">
                      {animal.age} {animal.breeds.primary}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <footer class="fixed bottom-0 left-0 z-20 w-full shadow bg-dark">
        <div class="w-full max-w-screen-xl p-4 mx-auto flex md:items-center justify-between">
          <span class="text-sm text-white sm:text-center">
            &copy; {new Date().getFullYear()} Promway Rescue
          </span>
          <span className="text-white sm:text-right">
            <a href="tel:3304948100" class="flex items-center">
              <FaPhone />
              &nbsp;(330) 494-8100
            </a>
            <a
              href="https://www.facebook.com/PromwayRescue/"
              class="flex items-center"
            >
              <FaFacebook />
              &nbsp;Promway Rescue
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}

export default App;
