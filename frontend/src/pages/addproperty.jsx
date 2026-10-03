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
    <div className="min-h-screen bg-black/10 backdrop-blur-md border border-whit/20  p-6">
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg border border-gray-800 hover:border-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] duration-300">
      <h2 className="text-2xl font-bold mb-5 py-4 text-center text-gray-800 tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        Add New Property
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Title Input */}
       <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Name of the property"
            className="w-full p-2 border rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Location Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-blue-500 to-purple-500">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Name of the city or area"
            className="w-full p-2 border rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Price Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 bg-gradient-to-r from-yellow-400 via-orage-500 to-red-500 text-transparent bg-clip-text">Price per night (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price in INR"
            className="w-full p-2 border rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        {/* Image URL Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Image URL</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            placeholder=""
            className="w-full p-2 border rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the property, its amenities, and any other relevant details."
            rows="3"
            className="w-full p-2 border rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
    </div>
  );
}

export default AddProperty;