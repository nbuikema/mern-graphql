import React, { useState, useEffect, useContext } from "react";
import { auth } from "../../firebase/firebase";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const CompleteRegistration = () => {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("Email and Password are required.");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");

        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: "LOGGED_IN_USER",
          payload: { email: user.email, token: idTokenResult.token },
        });

        history.push("/");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="container p-5">
      <h4>{loading ? "Loading..." : "Complete Registration"}</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input className="form-control" type="email" value={email} disabled />
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
          disabled={!password || loading}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CompleteRegistration;
