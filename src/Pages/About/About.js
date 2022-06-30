import React, { useEffect, useState } from "react";
import image from "../../images/coverImage13.png";
import LoadingState from "../Shared/LoadingState/LoadingState";
import PageTitle from "../Shared/PageTitle/PageTitle";

const About = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          " https://hidden-eyrie-82910.herokuapp.com/members"
        );
        const data = await res.json();
        setLoading(false);
        setMembers(data);
      } catch (err) {
        // console.error(err);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="font-style">
      <PageTitle title="About" />
      {loading ? <LoadingState /> : ""}
      <h4
        className={`about-title-sm about-title-md ${
          loading ? "hidden" : "block"
        }`}
      >
        About US
      </h4>
      <p
        className={`about-discription-sm about-discription-md about-discription-xl ${
          loading ? "hidden" : "block"
        }`}
      >
        We stock books in an easy and profitable way for small and medium
        bussiness. You can also find detailed and accurate information about the
        financial condition and performance in the last few years. It also
        allows you to know how much executives get paid and their lasts
        statements on conference calls. It also enables you to view financial
        statements that go back to five time periods. It is a guided environment
        and you will be able to handle more stocks markets in a near future.
      </p>
      <h4 className={`team-title ${loading ? "hidden" : "block"}`}>The Team</h4>
      <div className="team-container-sm team-container-md">
        {members.map((member) => (
          <div key={member._id} className="member-container ">
            <h6 className="member-name-sm member-name-xl">{member.name}</h6>
            <img className="w-52" src={member.img} alt="" />
          </div>
        ))}
      </div>
      <div className={`${loading ? "hidden" : "block"}`}>
        <h6 className="md:text-2xl mt-20 text-center">Thanks for visiting</h6>
        <p className="md:text-xl wish-message">Wish you all the best</p>
        <p className="md:text-xl wish-message">Stay with us</p>
        <div className="logo-container">
          <img className="w-10" src={image} alt="" />
          <p className="font-style">
            <i>bookMart</i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
