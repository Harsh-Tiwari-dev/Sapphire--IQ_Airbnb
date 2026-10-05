import { useState } from "react";
import {useEffect} from "react";
import {Link} from "react-router-dom";



function Home() { 
  const [user, setUser] = useState(null);
 
useEffect(()=>{
  hostuser();
},[]);
  

 const hostuser= async () =>{
 
  try {
    const response = await fetch("http://localhost:5000/api/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
    });
    const data = await response.json();
    if (response.ok) {
      if(data.role==="host"){
        setUser(data.user);
         }else{
        alert("You are not a host. Please sign up as a host to access this hostdashboard.");
      }
    }}catch (error) {
      console.error("Error fetching user:", error);
    }

  }
  return (
    <main className="min-h-screen bg-gray-100">

      <section className="flex flex-col items-center justify-center text-center py-24 px-6">

        <h1 className="text-5xl font-bold mb-6">
          Welcome to Airbnb
        </h1>

        <p className="text-gray-600 text-lg mb-8 max-w-xl">
          Discover unique places to stay and experiences to enjoy. Whether you're looking for a cozy apartment, a luxurious villa, or an adventurous getaway, Airbnb has something for everyone.
        </p>

        <a
          href="/property"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Explore Listings
        </a>
       {user ? (
          <Link to="/hostdashboard" className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800">
            Access Host Dashboard
          </Link>
        ) : (
          <p className="text-gray-600 py-3 bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-blue-500 to-purple-500">
            Must be a host to access the dashboard
          </p>
        )}

      </section>

    </main>
  )
}

export default Home