import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    dob: "",
    contact: ""
  });


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    api
      .get("/profile")
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.data);
        } else {
          navigate("/login");
        }
      })
      .catch(() => setMsg("Server error"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/profile", {
        age: user.age,
        dob: user.dob,
        contact: user.contact
      });

      if (res.data.success) {
        setMsg("Profile updated!");
      } else {
        setMsg(res.data.message);
      }
    } catch (err) {
      setMsg("Server error");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Profile</h2>

      <form onSubmit={handleSubmit} style={{ width: "300px" }}>
        <input
          type="text"
          value={user.name}
          readOnly
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="email"
          value={user.email}
          readOnly
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="number"
          placeholder="Age"
          value={user.age || ""}
          onChange={(e) => setUser({ ...user, age: e.target.value })}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="date"
          value={user.dob || ""}
          onChange={(e) => setUser({ ...user, dob: e.target.value })}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="text"
          placeholder="Contact"
          value={user.contact || ""}
          onChange={(e) => setUser({ ...user, contact: e.target.value })}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <button type="submit">Update</button>
      </form>

      {msg && <p>{msg}</p>}

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        style={{ marginTop: "20px" }}
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
