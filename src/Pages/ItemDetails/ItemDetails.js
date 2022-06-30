import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import LoadingState from "../Shared/LoadingState/LoadingState";
import PageTitle from "../Shared/PageTitle/PageTitle";

const ItemDetails = () => {
  const { id } = useParams();
  const [bookInfo, setbookInfo] = useState({});
  const { bookName, bookPrice, discription, imgUrl, quantity, supplierName } =
    bookInfo;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const userName = { name: user.displayName };
  const userEmail = { emailUser: user.email };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          ` https://hidden-eyrie-82910.herokuapp.com/books/${id}`
        );
        const data = await res.json();
        setLoading(false);
        setbookInfo(data);
      } catch (err) {
        setLoading(false);
        // console.error(err.message);
      }
    })();
  }, [id]);

  const handleDelivered = () => {
    const updatedQuantity = { quantity: quantity - 1 };
    const url = ` https://hidden-eyrie-82910.herokuapp.com/books/${id}`;
    (async () => {
      try {
        const res = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            updatedQuantity,
            bookInfo,
            userName,
            userEmail,
          }),
        });
        const data = await res.json();
        if (data.modifiedCount >= 1) {
          setbookInfo({ ...bookInfo, quantity: updatedQuantity.quantity });
        }
      } catch (err) {
        // console.error(err);
      }
    })();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const updatedQuantity = {
      quantity: parseInt(e.target.number.value) + parseInt(bookInfo.quantity),
    };
    const url = ` https://hidden-eyrie-82910.herokuapp.com/books/${id}`;
    (async () => {
      try {
        if (e.target.number.value > 0 && e.target.number.value < 500) {
          const res = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(updatedQuantity),
          });
          const data = await res.json();
          if (data.modifiedCount >= 1) {
            setbookInfo({ ...bookInfo, quantity: updatedQuantity.quantity });
            toast.success("Successfully restocked");
          }
        }
        if (e.target.number.value < 0) {
          toast.error(
            "Please insert a valid amount that you want to restock more"
          );
        }
        if (e.target.number.value > 500) {
          toast.error("You can stock maximum 500 books");
        }
        e.target.reset();
      } catch (err) {
        // console.error(err);
      }
    })();
  };

  const handleNavigate = () => {
    navigate("/manageInventories");
  };

  return (
    <div>
      <PageTitle title={`${bookName}`} />
      {loading ? <LoadingState /> : ""}
      <div className="text-green-600 mt-5 lg:mt-20 py-5 px-4 md:px-16 md:py-12 lg:p-20 lg:grid grid-cols-3 lg:gap-4 bg-gray-800 mx-4 md:mx-10 rounded-2xl font-bold mb-16">
        <div>
          <img
            className="md:w-6/12 lg:w-full xl:w-10/12  mx-auto md:mx-auto-0"
            src={imgUrl}
            alt=""
          />
        </div>
        <div className="col-span-2 space-y-1">
          <p className="md:text-2xl xl:text-3xl mt-5 lg:mt-0">{bookName}</p>
          <p className="md:text-2xl xl:text-3xl">${bookPrice}</p>
          <p className="md:text-2xl xl:text-3xl">{quantity} piece</p>
          <p className="md:text-2xl xl:text-2xl">By {supplierName}</p>
          <p className="text-xs md:text-xs xl:text-base text-justify text-gray-500">
            {discription}
          </p>
          <button
            onClick={handleDelivered}
            className="btn hover:btn-hover focus:btn-focus btn-sm btn-md xl:mb-0"
          >
            Delivered
          </button>
        </div>
      </div>
      <div className="mb-20 bg-gray-800 py-8 mx-4 md:mx-10 rounded-2xl">
        <h5 className="md:text-4xl text-green-600 text-center font-bold">
          Restock Item
        </h5>
        <form onSubmit={handleOnSubmit}>
          <input
            className="w-10/12 xl:w-7/12 block mx-auto bg-gray-800 mt-8 text-green-600 font-bold rounded"
            type="number"
            name="number"
            id="number"
            placeholder={`Please input the amount of piece that you want to restock more(${bookName})`}
            onInput={(e) =>
              (e.target.value = e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*?)\..*/g, "$1"))
            }
            required
          />
          <input
            className="btn hover:btn-hover focus:btn-focus btn-sm btn-md xl:mb-0 mx-auto block"
            type="submit"
            value="Add"
          />
        </form>
      </div>
      <button
        onClick={handleNavigate}
        className="btn hover:btn-hover focus:btn-focus btn-sm btn-md xl:mb-0 mx-auto block"
      >
        Manage Inventories
      </button>
    </div>
  );
};

export default ItemDetails;
