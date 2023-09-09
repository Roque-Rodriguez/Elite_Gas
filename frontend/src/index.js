import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "dark" }}
      >
        <AuthProvider>
          <App />
        </AuthProvider>
      </MantineProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
