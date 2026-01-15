// import React from "react";
// import AppRouting from "./AppRouting";
// import AuthRouting from "./AuthRouting";

// function MainRouter() {
//   const isLoggedIn = true; // replace with real auth state
//   return <>{isLoggedIn ? <AppRouting /> : <AuthRouting />}</>;
// }

// export default MainRouter;

// import React from "react";
import AppRouting from "./AppRouting";

function MainRouter() {
  return (
    <>
      <AppRouting />
    </>
  );
}

export default MainRouter;
