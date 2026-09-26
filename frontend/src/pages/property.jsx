import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/products")

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data = await response.json()
console.log("PRODUCT RESPONSE:", data)
        setProducts(data.products)
      } catch (error) {
        console.error(error)
        setError("Products DON'T load")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">
          Loading products...
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
        Our Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}

      </div>

    </div>
  )
}

export default Products