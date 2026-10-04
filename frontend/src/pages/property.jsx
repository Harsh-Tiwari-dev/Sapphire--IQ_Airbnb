import { useEffect, useState } from "react"
import PropertyCard from "../components/PropertyCard"

function Properties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const[searchterm,setSearchTerm]=useState("")

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/properties")

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

    fetchProperties()
  }, [])
  const filteredProperties = properties.filter((property) =>
    property.location.toLowerCase().includes(searchterm.toLowerCase())
  );


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">
          Loading properties..
        </h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-red-600">
          {error}
        </h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">




      <h1 className="text-4xl font-bold text-center mb-10">
        OUR PROPERTIES FOR BOOKING AND STAYING
      </h1>
      <div className="flex justify-center mb-8">
      <label className="gap-10 text-3xl font-bold mr-2">Enter location:</label>
      <input 
        type="text" 
        placeholder="Search for a location..." 
        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchterm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {(searchterm==="" ? properties : filteredProperties).map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
          />
        ))}

      </div>

    </div>
  )
}

export default Properties