//Higher Order Component

import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const withDelete = (OriginalComponent) => {
  const NewComponent = () => {
    const [itemsInfo, setItemsInfo] = useState([]);
    const MySwal = withReactContent(Swal);
    const handleDeleteItem = (id) => {
      MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        color: "#6b7280",
        background: "#1e293b",
        showCancelButton: true,
        confirmButtonColor: "#166534",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success",
            color: "#6b7280",
            background: "#1e293b",
            confirmButtonColor: "#166534",
          });
          (async () => {
            try {
              const res = await fetch(
                ` https://hidden-eyrie-82910.herokuapp.com/books?id=${id}`,
                {
                  method: "DELETE",
                }
              );
              const data = await res.json();
              if (data.deletedCount >= 1) {
                const restItems = itemsInfo.filter(
                  (itemInfo) => itemInfo._id !== id
                );
                setItemsInfo(restItems);
              }
            } catch (err) {
              // console.error(err.message);
            }
          })();
        }
      });
    };

    return (
      <div>
        <OriginalComponent
          handleDeleteItem={handleDeleteItem}
          itemsInfo={itemsInfo}
          setItemsInfo={setItemsInfo}
        ></OriginalComponent>
      </div>
    );
  };
  return NewComponent;
};

export default withDelete;
