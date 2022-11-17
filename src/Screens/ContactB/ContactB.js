import React, { useRef } from "react";        //importing required artifacts from react
import emailjs from "@emailjs/browser";         //importing required artifacts from emailjs

import Header from "../../Components/Header/Header";      //importing header from components
import './ContactB.css'
import Footer from "../../Components/Footer/Footer";        //importing footer from components


export default function ContactB() {
  const form = useRef();        //form containing email  

  const sendEmail = (e) => {      //handles sending email to lion site
    e.preventDefault();

    emailjs
      .sendForm(
        "service_jqq0ke6",
        "template_62hvg2x",
        form.current,
        "V_itaO6_FgMhs0fH8"
      )           //sends email to Lion site
      .then(
        (result) => {
          console.log(result.text);
          e.target.reset();
          alert("Message Sent Successfully, We'll Get Back To You Soon");       //informs user email is sent
        },
        (error) => {        //error catching
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <Header />
      <div class="body">
      <h2 className="heading">Contact Us</h2>

      <div className="contact-card">
      <form className="contact-form" ref={form} onSubmit={sendEmail}>
        <br />
        <div className="block2">
          <input
            className="contact-input"
            type="text"
            name="user_name"
            placeholder="Enter Your Name"
          />
          <br/>
          <input
            className="contact-input"
            type="email"
            name="user_email"
            placeholder="Enter Your Email"
          />
          <br />
          <textarea
            className="contact-textarea"
            name="message"
            placeholder="What Would You Like To Tell Us?"
          />
        </div>
        <br />
        <input type="submit" value="Submit" className = "subbut"/>
      </form>
      </div>
      </div>

      <div class="footer">
        <Footer />
      </div>
      
    </div>
  );
}
