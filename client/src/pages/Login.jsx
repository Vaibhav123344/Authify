import { useContext, useState } from "react";
import { assets } from "../assets/aseets"; // WARNING: Check for typo? "aseets" vs "assets"
import { Link, useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


const Login = () => {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 2. Destructure context as an object
  const { backendURL } = useContext(AppContext);
  // 3. Initialize navigate
  const navigate = useNavigate(); 

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    setLoading(true);
    
    // 4. Use backticks (`) for the URL, not single quotes (')
    const url = isCreateAccount 
        ? `${backendURL}/register` 
        : `${backendURL}/login`;
    const payload = isCreateAccount ? { name, email, password } : { email, password };

    try {
      const response = await axios.post(url, payload);

      if (isCreateAccount) {
        // 5. Check response.status for registration
        if (response.status === 201) {
          toast.success("Account created Successfully! Please login.");
          setIsCreateAccount(false); // Switch to login form
        }
      } else {
        // 6. Added Login logic
        if (response.data && response.data.token) {
          // Assuming your server sends a token
          localStorage.setItem("jwt_token", response.data.token);
          toast.success("Login Successful!");
          navigate("/"); // Redirect to home page
        }
      }
    } catch (err) {
      // 7. Use 'err' (your variable) and check for response
      const message = err.response?.data?.message || "An error occurred.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="position-relative min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(90deg, #6a5af9, #8268f9)",
        border: "none",
      }}
    >
      <div style={{ position: "absolute", top: "20px", left: "30px", display: "flex", alignItems: "center", }} >
        <Link to="/" style={{
          display: "flex",
          gap: 5,
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "24px",
          textDecoration: "none",
        }} >
          <img src={assets.logo} alt="logo" height={32} width={32} />
          <span className="fw-bold fs-4 text-light">  Authify</span>
        </Link>
      </div>
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">
          {isCreateAccount ? "Create Account" : "Login"}
        </h2>
        
        {/* 8. The <form> tag needs the onSubmit handler */}
        <form onSubmit={onSubmitHandler}>
          {
            isCreateAccount && (
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="fullname" // Changed ID
                  className="form-control"
                  placeholder="Enter Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
            )
          }
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Id</label>
            <input
              type="text"
              id="email"
              className="form-control"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password"
              id="password"
              className="form-control"
              placeholder="**********"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="d-flex justify-content-between mb-3">
            <Link to="/reset-password" className="text-decoration-none">
              Forgot password?
            </Link>
          </div>
          
          {/* 9. Removed redundant onClick from button */}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Loading..." : isCreateAccount ? "Sign up" : "Login"}
          </button>
          
          <div className="text-center mt-3">
            <p className="mb-0">
              {isCreateAccount ?
                (
                  <>
                    Already have an account?{" "}
                    <span
                      onClick={() => setIsCreateAccount(false)}
                      className="text-decoration-underline" style={{ cursor: "pointer" }}>
                      Login
                    </span>
                  </>
                ) : (
                  <>
                    Don't have an account?{" "}
                    <span
                      onClick={() => setIsCreateAccount(true)}
                      className="text-decoration-underline" style={{ cursor: "pointer" }}>
                      Sign up
                    </span>
                  </>
                )
              }
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;