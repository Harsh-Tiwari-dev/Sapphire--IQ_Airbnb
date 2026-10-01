import { useEffect, useState } from "react"
import PropertyCard from "../components/PropertyCard"

function Properties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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
        Our Properties
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {properties.map((property) => (
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