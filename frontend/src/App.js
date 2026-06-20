import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import NavBar from "./Components/NavBar";
import Slider from "./Components/Slider";
import Categories from "./Components/Categories";
import AllCards from "./Components/AllCards";
import Footer from "./Components/Footer";
import LoginPanel from "./Components/LoginPanel";
import RegisterPanel from "./Components/RegisterPanel";
import PurchaseHistory from "./Components/PurchaseHistory";
import PurchaseForm from "./Components/PurchaseForm";
import Post from "./Components/Post";
import AdminPanel from "./Components/AdminPanel";

import "./App.css";

function App() {
  const navigate = useNavigate();
  const [selectedCategorie, setSelectedCategorie] = useState("Sve");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [exchangeRate, setExchangeRate] = useState(null);

  const data = [
    {
      url: "https://imgmediagumlet.lbb.in/media/2020/02/5e411bd858cefc0532808d21_1581325272415.jpg",
    },
    {
      url: "https://static.vecteezy.com/system/resources/thumbnails/028/246/030/small/colourful-clothes-on-clothing-rack-pastel-colorful-closet-in-shopping-store-or-bedroom-rainbow-color-clothes-choice-on-hangers-home-wardrobe-concept-generative-ai-photo.jpg",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP2_fg-TaBTO6NqpgNyBO_PFUwoE-sV347wQ&s",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXk-Nvxc5DGexQxddjW3dWuyeW2SsjG-ceqw&s",
    },
  ];

  const fetchExchangeRate = async () => {
    try {
      const response = await axios.get("https://open.er-api.com/v6/latest/EUR");
      if (response.data.rates && response.data.rates.RSD) {
        setExchangeRate(response.data.rates.RSD);
      }
    } catch (error) {
      console.error("Greška pri dohvatanju kursa:", error);
      setExchangeRate(null);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategorie(category.name);
    fetchProducts(category);
  };

  const fetchProducts = async (category = null, term = "") => {
    try {
      let url = "http://localhost:8000/api/products";
      if (category && category.id) {
        url = `http://localhost:8000/api/categories/${category.id}/products`;
      }
      if (term) {
        url += `${category?.id ? "&" : "?"}search=${term}`;
      }
      const response = await axios.get(url);
      setProducts(response.data.data);
    } catch (error) {
      console.error("Greška prilikom učitavanja proizvoda:", error);
      setProducts([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Greška prilikom dohvatanja kategorija:", error);
    }
  };

  const fetchUser = async (token) => {
    try {
      const response = await axios.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.data);
    } catch (error) {
      console.error("Greška pri dohvatanju korisnika:", error);
      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
      setUser(null);
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
      fetchUser(token);
    }
    fetchProducts();
    fetchCategories();
    fetchExchangeRate();
  }, []);

  const handleLogin = (loginData) => {
    localStorage.setItem("authToken", loginData.access_token);
    setIsLoggedIn(true);
    setUser(loginData.user);
    navigate("/");
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Greška pri odjavi:", error);
    } finally {
      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
      setUser(null);
      navigate("/");
    }
  };

  const handleInitiatePurchase = (productData) => {
    if (user?.is_admin) {
      alert("Admin korisnici ne mogu da kupuju proizvode.");
      return;
    }

    if (!isLoggedIn) {
      alert("Morate biti prijavljeni da biste kupili proizvod.");
      return;
    }
    setSelectedProduct(productData);
    setShowPurchaseForm(true);
  };

  const handleConfirmPurchase = async (productId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;
      const response = await axios.post(
        "http://localhost:8000/api/purchase",
        {
          product_id: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        alert("Kupovina uspešno obavljena!");
        fetchProducts();
      }
    } catch (error) {
      console.error("Greška pri kupovini:", error);
      alert("Neuspešna kupovina. Molimo pokušajte ponovo.");
    } finally {
      setShowPurchaseForm(false);
      setSelectedProduct(null);
    }
  };

  const handlePost = async (newData) => {
    if (user?.is_admin) {
      alert("Admin korisnici ne mogu da postavljaju oglase.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Morate biti prijavljeni da biste postavili oglas.");
        return;
      }
      const response = await axios.post(
        "http://localhost:8000/api/products",
        newData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        alert("Oglas uspešno postavljen!");
        fetchProducts();
      }
    } catch (error) {
      console.error("Greška pri postavljanju oglasa:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        console.log("Greška validacije:", error.response.data.errors);
        alert("Neuspešno postavljanje oglasa. Proverite konzolu za detalje.");
      } else {
        alert("Neuspešno postavljanje oglasa. Molimo pokušajte ponovo.");
      }
    }
  };

  const handleSortChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <div className="App">
      <NavBar
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
        onSearch={(term) => fetchProducts(null, term)}
      />
      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Slider data={data} />
                <Categories
                  categories={categories}
                  onCategoryClick={handleCategoryClick}
                />
                <div className="sort-div">
                  <button className="sort-btn" onClick={handleSortChange}>
                    Sortiraj po ceni {sortOrder === "asc" ? "▲" : "▼"}
                  </button>
                </div>
                <AllCards
                  dataC={sortedProducts}
                  onPurchase={handleInitiatePurchase}
                  user={user}
                  exchangeRate={exchangeRate}
                />
              </>
            }
          />

          <Route path="/login" element={<LoginPanel onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPanel />} />

          <Route
            path="/history"
            element={
              isLoggedIn ? (
                user?.is_admin ? (
                  <div
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      color: "red",
                    }}
                  >
                    Administratorski nalog nema istoriju kupovine/prodaje na
                    ovoj ruti.
                  </div>
                ) : (
                  <PurchaseHistory
                    user={user}
                    exchangeRate={exchangeRate}
                    onUnauthorizedLogout={handleLogout}
                  />
                )
              ) : (
                <div style={{ padding: "20px", textAlign: "center" }}>
                  Morate biti prijavljeni da biste videli istoriju kupovine.
                  <button
                    onClick={() => navigate("/login")}
                    style={{
                      display: "block",
                      margin: "10px auto",
                      padding: "10px 20px",
                    }}
                  >
                    Prijavi se
                  </button>
                </div>
              )
            }
          />
          <Route
            path="/postavi-oglas"
            element={
              isLoggedIn ? (
                user?.is_admin ? (
                  <div
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      color: "red",
                    }}
                  >
                    Administratorski nalog ne može da postavlja oglase.
                  </div>
                ) : (
                  <Post categories={categories} onPost={handlePost} />
                )
              ) : (
                <div style={{ padding: "20px", textAlign: "center" }}>
                  Morate biti prijavljeni da biste postavili oglas.
                  <button
                    onClick={() => navigate("/login")}
                    style={{
                      display: "block",
                      margin: "10px auto",
                      padding: "10px 20px",
                    }}
                  >
                    Prijavi se
                  </button>
                </div>
              )
            }
          />
          <Route
            path="/admin"
            element={
              isLoggedIn && user?.is_admin ? (
                <AdminPanel />
              ) : (
                <div
                  style={{ padding: "20px", textAlign: "center", color: "red" }}
                >
                  Niste autorizovani za pristup ovoj stranici.
                </div>
              )
            }
          />
        </Routes>
      </div>
      <Footer />

      {showPurchaseForm && selectedProduct && (
        <PurchaseForm
          onConfirm={handleConfirmPurchase}
          onCancel={() => setShowPurchaseForm(false)}
          product={selectedProduct}
        />
      )}
    </div>
  );
}

export default App;
