import { Route, Routes } from "react-router-dom";
import AddInventoryItem from "./Pages/AddInventoryItem/AddInventoryItem";
import Home from "./Pages/Home/Home";
import ManageInventories from "./Pages/ManageInventories/ManageInventories";
import Header from "./Pages/Shared/Header/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="bg-gray-900 h-[1200px]">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/manageInventories" element={<ManageInventories />} />
        <Route path="/addinventoryitem" element={<AddInventoryItem />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
