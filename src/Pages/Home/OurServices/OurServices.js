import React, { useEffect, useState } from "react";
import LoadingState from "../../Shared/LoadingState/LoadingState";

const OurServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          " https://hidden-eyrie-82910.herokuapp.com/services"
        );
        const data = await res.json();
        setLoading(false);
        setServices(data);
      } catch (err) {
        // console.error(err);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <h3 className="text-green-600 text-center font-bold mt-20 xl:mt-40 md:text-4xl xl:text-5xl">
        Our Services
      </h3>
      {loading ? <LoadingState /> : ""}
      <div className="xl:grid grid-cols-3 gap-4 text-gray-500 font-bold py-8 px-4 md:px-16 items-center">
        {services.map((service) => (
          <div
            key={service._id}
            className="p-4 border rounded-xl bg-gray-800 hover:bg-green-600 hover:text-black mb-4"
          >
            <img className="h-40 md:h-80 mx-auto" src={service.img} alt="" />
            <h5 className="md:text-3xl">{service.name}</h5>
            <p className="text-xs md:text-base text-justify mt-2 md:mb-5 xl:mb-0">
              {service.discription}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
