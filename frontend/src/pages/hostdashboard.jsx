import React, { useState, useEffect } from "react";

function HostDashboard() {
const [properties, setProperties] = useState([]);
useEffect(() => {
    fetchProperties();
  }, []);
   

const deleteProperty = async (propertyId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/properties/${propertyId}`, {
        method: "DELETE",
        credentials: "include", 
      });


    }catch (error) {
      console.error("Error deleting property:", error);
    }

    const [properties, setProperties] = useState([]);
const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/properties/${propertyId}`",{
            method: "GET", 
            credentials: "include"}
        )
          
        if (!response.ok) {
          throw new Error("Failed to fetch properties")
        }

        const data = await response.json()
console.log("PROPERTIES RESPONSE:", data)
        setProperties(data.properties)
      } catch (error) {
        console.error(error)
        setError("Properties DON'T load")
      } finally {
        setLoading(false)
      }
    }

}

return(
<main className="min-h-screen bg-gray-100">
<div>
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">

        <h1 className="text-5xl font-bold mb-6">
          Welcome to Host Dashboard
        </h1>      
</section>
</div>
<div></div>
   {properties.map((property) =>(<div><div 
        className="h-52 bg-gray-200 flex items-center justify-center cursor-pointer relative"
     
      >
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover"
        />
     
      </div>

      <div className="p-5  align-items center" >
        <h2 className="text-xl font-semibold">
          {property.name}
        </h2>

       
        <p className="text-sm text-gray-500 mt-1">
          📍 {property.location}
        </p>

        <p className="text-gray-600 mt-2">
          {property.description}
        </p>
        
       

      

        
          </div>
       

        <div className=" flex  justify-between mt-5">
            
          <span className="text-xl   font-bold">
            ₹{property.price}
          </span>
        <Link 
  to="/editproperty" 
  
  state={{ 
   
   
            
             
  }} 
  className="bg-blue-600 text-white px-4 py-2 rounded"
>
  
</Link>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => deleteProperty(property._id)}

  
></button>

         
        </div></div>))}

      




</main>

 )}
 export default HostDashboard