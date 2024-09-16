import React from "react";

function Login() {
  const handleSignWithGoogle = () => {
    window.open("http://localhost:3000/auth/google");
  };

  const handleSignWithGithub = () => {
    window.open("http://localhost:3000/auth/github");
  };
  return (
    <div>
      <button onClick={handleSignWithGoogle}>SignInWithGoogle</button>
      <button onClick={handleSignWithGithub}>SignInWithgithub</button>
    </div>
  );
}

export default Login;
