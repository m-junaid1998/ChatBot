// import React from "react";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   return (
//     <div>
//       <Dashboard />
//     </div>
//   );
// }

// export default App;
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import ThemeWrapper from "./components/ThemeWrapper";
import MainRouter from "./router";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeWrapper>
          <BrowserRouter>
            <MainRouter />
          </BrowserRouter>
        </ThemeWrapper>
      </PersistGate>
    </Provider>
  );
}

export default App;
