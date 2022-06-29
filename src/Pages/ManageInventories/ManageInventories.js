import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import PageTitle from "../Shared/PageTitle/PageTitle";
import withDelete from "../Shared/HOC/withDelete";
import LoadingState from "../Shared/LoadingState/LoadingState";
import Swal from "sweetalert2";

const ManageInventories = ({ itemsInfo, setItemsInfo, handleDeleteItem }) => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [pageCount, setPageCount] = useState(0);
  const [pages, setPages] = useState(0);
  const [size, setSize] = useState(4);
  const [loading, setLoading] = useState(true);

  const handleDelete = () => {
    Swal.fire({
      text: "You are not allowed to delete this item",
      icon: "info",
      color: "#6b7280",
      background: "#1e293b",
      confirmButtonColor: "#166534",
      confirmButtonText: "Ok",
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://hidden-eyrie-82910.herokuapp.com/getbooks?email=${user?.email}&pages=${pages}&size=${size}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const data = await res.json();
        setLoading(false);
        setItemsInfo(data.books);
        const count = data.count;
        setPageCount(Math.ceil(count / size));
        if (data.message === "Forbidden access") {
          signOut(auth);
          navigate("/login");
        }
      } catch (err) {
        // console.error(err.message);
        setLoading(false);
        if (err.response.status === 401 || err.response.status === 403) {
          signOut(auth);
          navigate("/login");
        }
      }
    })();
  }, [user, navigate, size, pages, setItemsInfo]);

  const handleNavigate = () => {
    navigate("/addinventoryitem");
  };

  return (
    <div>
      <PageTitle title="Manage Item" />
      {loading ? <LoadingState /> : ""}
      <div className="p-12 mb-80 hidden md:block">
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-black uppercase bg-green-600">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Item name
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Supplier Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {itemsInfo?.map((itemInfo) => (
                <tr
                  key={itemInfo._id}
                  className="border-b-4 border-green-600 bg-gray-800 text-gray-300 font-bold"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-bold text-gray-300 whitespace-nowrap"
                  >
                    {itemInfo.bookName}
                  </th>
                  <td className="px-6 py-4">{itemInfo.quantity}</td>
                  <td className="px-6 py-4">{itemInfo.supplierName}</td>
                  <td className="px-6 py-4">{itemInfo.bookPrice}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={handleDelete}
                      className="font-medium text-red-500"
                    >
                      <FontAwesomeIcon className="h-6" icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleNavigate}
          className="px-8 py-2 bg-green-600 text-gray-300 rounded font-bold mt-10 hover:bg-green-400 hover:text-black mx-auto block m-8 focus:ring-4 focus:ring-offset-slate-800"
        >
          Add New Item
        </button>
        <div className="flex my-3 justify-end">
          {[...Array(pageCount).keys()].map((number) => (
            <div
              key={number}
              onClick={() => setPages(number)}
              className={`mx-3 border-2 border-gray-500 text-white px-3 py-1 cursor-pointer font-bold ${
                pages === number ? "bg-green-600 text-white" : "bg-gray-800"
              }`}
            >
              {number + 1}
            </div>
          ))}
          <select
            className="bg-gray-600 text-white font-bold"
            defaultValue={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
      <div className="p-4 md:p-12 mb-80 block md:hidden">
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-black uppercase bg-green-600">
              <tr>
                <th scope="col" className="px-3 py-3">
                  Item name
                </th>
                <th scope="col" className="px-3 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-3 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {itemsInfo?.map((itemInfo) => (
                <tr
                  key={itemInfo._id}
                  className="border-b-4 border-green-600 bg-gray-800 text-gray-300 font-bold text-xs"
                >
                  <th
                    scope="row"
                    className="px-3 py-4 font-bold text-gray-300 whitespace-nowrap"
                  >
                    {itemInfo.bookName}
                  </th>
                  <td className="px-6 py-4">{itemInfo.quantity}</td>
                  <td className="px-3 py-4 text-right">
                    <button
                      onClick={handleDelete}
                      className="font-medium text-red-500"
                    >
                      <FontAwesomeIcon className="h-6" icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleNavigate}
          className="px-8 py-2 bg-green-600 text-gray-300 rounded font-bold mt-10 hover:bg-green-400 hover:text-black mx-auto block m-8 focus:ring-4 focus:ring-offset-slate-800"
        >
          Add New Item
        </button>
        <div className="flex my-3 justify-end">
          {[...Array(pageCount).keys()].map((number) => (
            <div
              key={number}
              onClick={() => setPages(number)}
              className={`mx-3 border-2 border-gray-500 text-white px-3 py-1 cursor-pointer font-bold ${
                pages === number ? "bg-green-600 text-white" : "bg-gray-800"
              }`}
            >
              {number + 1}
            </div>
          ))}
          <select
            className="bg-gray-600 text-white font-bold"
            defaultValue={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default withDelete(ManageInventories);
