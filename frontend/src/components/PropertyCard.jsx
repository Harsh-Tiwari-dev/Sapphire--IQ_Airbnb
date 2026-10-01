import { useState } from "react"

function PropertyCard({ property }) {
 
  const [added, setAdded] = useState(false);

 
  if (!property) return null;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
      
      <div className="h-52 bg-gray-200 flex items-center justify-center">
      
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5">
        <h2 className="text-xl font-semibold">
          {property.title}
        </h2>

         <h3 className="text-xl font-semibold">
          {property.location}
        </h3>

        <p className="text-gray-600 mt-2">
          {property.description}
        </p>

        <div className="flex items-center justify-between mt-5">
          <span className="text-xl font-bold">
            ₹{property.price}
          </span>

          <button
            onClick={() => setAdded(!added)} //
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>

      </div>

    </div>
  )
}

export default PropertyCard