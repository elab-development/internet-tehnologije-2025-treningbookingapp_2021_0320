import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterPanel.css";

const RegisterPanel = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        username,
        email,
        password,
      });

      console.log("Registracija uspešno završena!", response.data);
      alert("Registracija uspešna! Sada se možete prijaviti.");
      navigate("/login");
    } catch (err) {
      console.error("Greška pri registraciji:", err);
      if (err.response && err.response.data && err.response.data.errors) {
        const backendErrors = err.response.data.errors;
        const errorMessages = Object.values(backendErrors).flat();
        setError(`Greška validacije: ${errorMessages.join(" ")}`);
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        setError(`Greška: ${err.response.data.message}`);
      } else {
        setError(
          "Došlo je do greške pri registraciji. Proverite da li je backend pokrenut."
        );
      }
    }
  };

  return (
    <div className="registerPanel">
      <button className="close-btn" onClick={() => navigate("/")}>
        X
      </button>
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registracija</h2>
        {error && <div className="error-message">{error}</div>}
        <input
          type="text"
          placeholder="Korisničko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registruj se</button>
      </form>
    </div>
  );
};

export default RegisterPanel;
