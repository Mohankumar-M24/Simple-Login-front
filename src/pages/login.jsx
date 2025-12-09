import { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate("/profile");
      } else {
        setMsg(res.data.message);
      }
    } catch (err) {
      setMsg("Server error");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit} style={{ width: "300px" }}>
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

        <button type="submit">Login</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}

export default Login;
