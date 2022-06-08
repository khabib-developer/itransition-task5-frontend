import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Loader from "./components/Loader";
import {
  SnackbarError,
  SnackbarInfo,
  SnackbarSuccess,
} from "./components/snackBar";
import { Pages } from "./routes";

function App() {
  return (
    <Router>
      <Loader />
      <SnackbarError />
      <SnackbarInfo />
      <SnackbarSuccess />
      <Pages />
    </Router>
  );
}

export default App;
