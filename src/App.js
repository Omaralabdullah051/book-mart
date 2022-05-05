import { Route, Routes } from "react-router-dom";
import AddInventoryItem from "./Pages/AddInventoryItem/AddInventoryItem";
import Home from "./Pages/Home/Home";
import ManageInventories from "./Pages/ManageInventories/ManageInventories";
import Header from "./Pages/Shared/Header/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ItemDetails from "./Pages/ItemDetails/ItemDetails";
import Footer from "./Pages/Shared/Footer/Footer";
import Login from "./Pages/Authentication/Login/Login";
import Register from "./Pages/Authentication/Register/Register";
import RequireAuth from "./Pages/Shared/RequireAuth/RequireAuth";
import ViewProfile from "./Pages/ViewProfile/ViewProfile";
import MyItems from "./Pages/MyItems/MyItems";
import NotFound from "./Pages/NotFound/NotFound";


function App() {
  return (
    <div className="bg-gray-900">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/manageInventories" element={<RequireAuth><ManageInventories /></RequireAuth>} />
        <Route path="/addinventoryitem" element={<RequireAuth><AddInventoryItem /></RequireAuth>} />
        <Route path="/itemDetails/:id" element={<RequireAuth><ItemDetails /></RequireAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myItems" element={<RequireAuth><MyItems /></RequireAuth>} />
        <Route path="/viewprofile" element={<ViewProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
