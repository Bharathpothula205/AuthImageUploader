import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import '../App.css'

function Profile() {
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
const navigate=useNavigate();
  const token = localStorage.getItem("token"); // or from context

  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate('/');
  }
  // 📤 Upload Image to backend
  const handleUpload = async (e) => {
    e.preventDefault();
  

    if (!image) {
      alert("select an image") 
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setImage(null);
      fetchPosts(); // refresh uploaded posts
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  // 📥 Fetch user posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (err) {
      console.error("Fetching posts failed", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-white p-8">
      <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="mb-6">
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          className="mb-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded m-6"
        >
          Upload
        </button>
        <button onClick={handleLogout}>Logout</button>
      </form>

      {/* Posts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {posts.map((post) => (
          <div key={post._id} className="border rounded p-2">
            <img
              src={post.imageUrl}
              alt="Uploaded"
              className="w-full h-48 object-cover rounded"
            />
             <button
              onClick={() => handleDelete(post._id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              ❌
            </button>
          </div>
          
        ))}
      </div>
    </div>
  );
}

export default Profile;
