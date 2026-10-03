import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProperty() {
  const navigate = useNavigate();


 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const[host,setHost]=useState("");


 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


     
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("image", imageFile);

   
 

    try {
      const response = await fetch("http://localhost:5000/api/properties",{
        method: "POST",
        body: formData,
    
      });

      const data = await response.json();

      if (response.ok) {
        alert("Property added successfully ");
        navigate("/property"); 
      } else {
        alert("Error: " + (data.message || data.error));
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("connect to server errror");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border">
      <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">
        Add New Property
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Name of the property"
            className="w-full p-2 border rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Location Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Name of the city or area"
            className="w-full p-2 border rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Price Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price per night (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price in INR"
            className="w-full p-2 border rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Image URL Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            placeholder=""
            className="w-full p-2 border rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the property, its amenities, and any other relevant details."
            rows="3"
            className="w-full p-2 border rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
        >
          {loading ? "Adding Property..." : "Add Property"}
        </button>

      </form>
    </div>
  );
}

export default AddProperty;