import { Switch } from "@mui/material";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login></Login>} />
        <Route path="/signup" element={<SignUp></SignUp>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
