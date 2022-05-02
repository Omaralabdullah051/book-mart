import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ManageInventories from "./Pages/ManageInventories/ManageInventories";
import Header from "./Pages/Shared/Header/Header";


function App() {
  return (
    <div className="bg-gray-900 h-[1200px]">
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
