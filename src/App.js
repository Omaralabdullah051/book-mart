import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ManageInventories from "./Pages/ManageInventories/ManageInventories";
import Header from "./Pages/Shared/Header/Header";


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/manageInventories" element={<ManageInventories />} />
      </Routes>
    </div>
  );
}

export default App;
