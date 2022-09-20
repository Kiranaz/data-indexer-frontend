import React from "react";
import { TextField } from "@mui/material";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Form from "./form";
import AppRouter from "./routes";

function App() {
  return (
    <div className="App bg-slate-200">
      {/* <Form /> */}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
