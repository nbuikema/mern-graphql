import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, googleAuthProvider } from "../../firebase/firebase";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then(async (result) => {
          const { user } = result;
          const idTokenResult = await user.getIdTokenResult();

          dispatch({
            type: "LOGGED_IN_USER",
            payload: { email: user.email, token: idTokenResult.token },
          });

          history.push("/");
        });
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = (e) => {
    e.preventDefault();

    auth.signInWithPopup(googleAuthProvider).then(async (result) => {
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: "LOGGED_IN_USER",
        payload: { email: user.email, token: idTokenResult.token },
      });

      history.push("/");
    });
  };

  return (
    <div className="container p-5">
      <h4>{loading ? "Loading..." : "Login"}</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            type="email"
            value={email}
            placeholder="Enter Email"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            type="password"
            value={password}
            placeholder="Enter Password"
            disabled={loading}
          />
        </div>

        <button
          className="btn btn-raised btn-primary"
          disabled={!email || !password || loading}
        >
          Submit
        </button>
        <button
          onClick={googleLogin}
          className="btn btn-raised btn-danger ml-1"
        >
          Login With Google
        </button>
      </form>
    </div>
  );
};

export default Login;
