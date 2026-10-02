import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PropertyCard({ property }) {
 
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hasBooked, setHasBooked] = useState(false);

 
  useEffect(() => {
    if (showReviewBox) {
      fetchReviews();
      checkIfUserBooked();
    }
  }, [showReviewBox]);


  const checkIfUserBooked = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/my`, {
        credentials: "include" 
      });
      const data = await response.json();
      if (response.ok) {
        setHasBooked(data.hasBooked); 
      }
    } catch (error) {
      console.error("Error checking booking:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${property._id}`);
      const data = await response.json();
      if (response.ok) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    console.log("Property ID:", property._id || property.id); 
  console.log("Rating:", rating);
  console.log("Comment:", comment);
    console.log("Button clicked, function chal raha hai!"); 
    try {
      const response = await fetch("http://localhost:5000/api/reviews",);

      if (response.ok) {
        alert("Review added successfully!");
        setComment("");
        fetchReviews();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!property) return null;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
      
     
      <div 
        className="h-52 bg-gray-200 flex items-center justify-center cursor-pointer relative"
        onClick={() => setShowReviewBox(!showReviewBox)}
      >
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {showReviewBox ? "Close Reviews" : "View & Add Reviews"}
        </span>
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
        
       

        
        {showReviewBox && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
            <h3 className="text-sm font-bold mb-2">All Reviews</h3>
            
            <div className="max-h-32 overflow-y-auto mb-3 space-y-2">
              {reviews.length === 0 ? (
                <p className="text-xs text-gray-500">no reviews yet</p>
              ) : (
                reviews.map((rev, index) => (
                  <div key={index} className="text-xs bg-white p-2 rounded border">
                    <span className="font-bold text-yellow-600">★ {rev.rating}/5</span>
                    <p className="text-gray-700 mt-1">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>
{hasBooked ?(
            <form onSubmit={handleReviewSubmit}>
              <input 
                type="number" min="1" max="5" value={rating} 
                onChange={(e) => setRating(e.target.value)}
                className="w-full p-1 border rounded text-sm mb-2 bg-white"
                required
              />
              <textarea 
                value={comment} onChange={(e) => setComment(e.target.value)}
                placeholder="write your review here..."
                className="w-full p-1 border rounded text-sm mb-2 bg-white"
                rows="2" required
              />
              <button type="submit" className="w-full py-1 bg-blue-600 text-white text-sm rounded">
                Submit Review
              </button>
            </form>):(
              <p className="text-xs text-gray-500">You can only review after booking this property.</p>
            )}
          </div>
        )}
          </div>
       

        <div className=" flex  justify-between mt-5">
            
          <span className="text-xl   font-bold">
            ₹{property.price}
          </span>
        <Link 
  to="/booking" 
  
  state={{ 
   
    price: property.price,         
             
  }} 
  className="bg-blue-600 text-white px-4 py-2 rounded"
>
  Book Now
</Link>
         
        </div>

      </div>

    
  );
}

export default PropertyCard;