import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Post.css";

const Post = ({ categories, onPost }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryId) {
      alert("Molimo izaberite kategoriju.");
      return;
    }

    const newProduct = {
      title,
      description,
      price: parseFloat(price),
      location,
      image_url: imageUrl,
      category_id: parseInt(categoryId, 10),
    };

    onPost(newProduct);

    setTitle("");
    setDescription("");
    setPrice("");
    setLocation("");
    setImageUrl("");
    setCategoryId("");
  };

  return (
    <div className="post-container">
      <button className="back-link" onClick={() => navigate("/")}>
        &larr; Povratak na početnu stranicu
      </button>

      <h2>Postavi Oglas</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label>Naslov:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Opis:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Cena (RSD):</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="1"
          />
        </div>

        <div className="form-group">
          <label>Lokacija:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>URL Slike:</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Kategorija:</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">-- Izaberite kategoriju --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="post-btn">
          Postavi oglas
        </button>
      </form>
    </div>
  );
};

export default Post;
