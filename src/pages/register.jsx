import { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        setMsg("Registered successfully!");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setMsg(res.data.message);
      }
    } catch (err) {
      setMsg("Server error");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit} style={{ width: "300px" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />

        <button type="submit">Register</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}

export default Register;
