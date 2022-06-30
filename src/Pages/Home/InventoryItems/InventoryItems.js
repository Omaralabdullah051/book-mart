import React, { useEffect, useState } from "react";
import InventoryItem from "../InventoryItem/InventoryItem";

const InventoryItems = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          " https://hidden-eyrie-82910.herokuapp.com/books"
        );
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        // console.error(err.message);
      }
    })();
  }, []);

  return (
    <div>
      <h4 className="text-green-700 text-center mt-20 xl:mt-32 mb-6 font-bold md:text-5xl">
        Inventory Items
      </h4>
      <div className="lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-8 py-4 md:py-8 px-4 md:px-16">
        {books.slice(0, 6).map((book) => (
          <InventoryItem key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default InventoryItems;
