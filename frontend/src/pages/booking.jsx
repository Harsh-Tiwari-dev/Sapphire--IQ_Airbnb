import { useState } from "react";
import { useLocation } from 'react-router-dom';


import { useNavigate} from "react-router-dom";

function Booking() {
    
  const navigate = useNavigate();
  const location = useLocation();
 

  const pricePerDay = location.state?.price || 0; 
 


  
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [loading, setLoading] = useState(false);



 
  const calculateTotalPrice = () => {
    if (!checkin || !checkout) return 0;

    const startDate = new Date(checkin);
    const endDate = new Date(checkout);
    
    
    const diffTime = endDate - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    
    
    return diffDays > 0 ? diffDays * pricePerDay : 0;}
    const h=calculateTotalPrice();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
     
     const fulldata={
        checkin:checkin,
        checkout:checkout,
        totalprice:h,
      
     }


    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
       credentials: "include", 
       
        body: JSON.stringify({ fulldata }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Booking successfully ");
        navigate("/home");
      } else {
        alert("Error: " + (data.message || data.error));
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Server does not connect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-xl shadow-md border">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Book Your Stay
      </h2>

      <form onSubmit={handleSignup} className="space-y-4">
        
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
          <input
            type="date"
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            placeholder="Enter check-in date"
            className="w-full p-2.5 border rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
          <input
            type="date"
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
            placeholder="Enter check-out date"
            className="w-full p-2.5 border rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Price</label>
          <input
            type="text"
            value={`₹ ${calculateTotalPrice()}`}
            
            readOnly
            placeholder="Your total price"
            className="w-full p-2.5 border rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

   
       

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
            {loading ? "Booking..." : "Book Now"}
        </button>

      </form>

      
    </div>
  );
}

export default Booking;