import React from "react";

function Login() {
  const handleSignWithGoogle = () => {
    window.open("http://localhost:3000/auth/google", "_self");
  };
  return (
    <div>
      <button onClick={handleSignWithGoogle}>SignInWithGoogle</button>
    </div>
  );
}

export default Login;
