import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPanel.css";

const LoginPanel = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      if (onLogin) {
        onLogin(response.data);
      } else {
        console.warn("onLogin prop nije prosleđen komponenti LoginPanel.");
      }

      navigate("/");
    } catch (err) {
      setError("Neispravan email ili lozinka.");
      console.error(err);
    }
  };

  return (
    <div className="login-panel">
      <button className="close-btn" onClick={() => navigate("/")}>
        X
      </button>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Prijavi se</h2>
        {error && <div className="error-message">{error}</div>}
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
        <button type="submit">Prijavi se</button>
      </form>
    </div>
  );
};

export default LoginPanel;
