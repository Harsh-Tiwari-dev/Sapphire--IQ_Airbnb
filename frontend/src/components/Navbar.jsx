import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        ShopEasy
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-8">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>

        <Link to="/products" className="hover:text-blue-600">
          Products
        </Link>

        <Link to="/cart" className="hover:text-blue-600">
          Cart
        </Link>

        

        <Link
          to="/signup"
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Sign Up
        </Link>
      </div>

    </nav>
  )
}

export default Navbar