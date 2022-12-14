import React, { useContext } from "react";
import { NameContext, LoginContext, CartContext } from "../Context";
import ContactCard from "../components/ContactCard";
import { useState, useEffect } from "react";

export default function About() {
  const { name, setName } = useContext(NameContext);

  const today = new Date();

  const [contacts, setContacts] = useState([
    {
      name: "Motheo Tsirwe",
      email: "2329751@students.wits.ac.za",
      color: "#D4CFB4",
    },
    {
      name: "Thulasizwe Sabela",
      email: "2140615@students.wits.ac.za",
      color: "#ABB596",
    },
    {
      name: "Zukisa Moto",
      email: "2340955@students.wits.ac.za",
      color: "#50836C",
    },
    {
      name: "Tshepiso Mahoko",
      email: "2352695@students.wits.ac.za",
      color: "#FAEBD7",
    },
    {
      name: "Tiisetso Mojalefa",
      email: "2369718@students.wits.ac.za",
      color: "#80cbc4",
    },
  ]);

  return (
      <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
      <h3 className="about_details">About Us</h3>
      <br />
      <h6 style={{marginLeft: "10%", marginRight: "10%"}}>
        GiveALittle is an Online MarketPlace similar to takealot for both Buyers
        and Sellers which allows them to buy products or goods they need online
        OR sell the items they want to sell, meaning they can be both a buyer
        and the seller at the same time.
      </h6>
      <br />
      <h2 style={{ display: "flex", justifyContent: "center" }}>Developers</h2>
      <div className="all-contacts-container">
        {contacts.map((contact, index) => {
          return (
            <ContactCard
              key={index}
              name={contact.name}
              email={contact.email}
              color={contact.color}
            />
          );
        })}
      </div>
      </div>
  );
}
