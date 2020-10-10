import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    window.localStorage.setItem("emailForRegistration", email);

    toast.success(
      `An email has been sent to ${email}. Please click the link to complete your registration.`,
      {
        autoClose: false,
      }
    );

    setEmail("");
    setLoading(false);
  };

  return (
    <div className="container p-5">
      <h4>{loading ? "Loading..." : "Register"}</h4>
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
        <button
          className="btn btn-raised btn-primary"
          disabled={!email || loading}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
