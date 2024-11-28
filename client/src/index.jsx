import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store.js";
import App from "./App.jsx";
import "./index.css";
import "animate.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </PersistGate>
  </Provider>
);
