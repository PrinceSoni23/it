import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Header2 from "../components/Header2";
import GFOOTER from "../components/GFOOTER";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2ovqpcb",
        "template_s9uwu8a",
        form.current,
        "yokImX3CN6V5sCiIw"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
    <Header2/>
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg mt-14 mb-10 ">
      <h2 className="text-2xl text-center font-libre font-bold capitalize mb-6 text-gray-700">Contact Us</h2>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="flex flex-col gap-4 text-base"
      >
        <label className="font-semibold">Name</label>
        <input
          type="text"
          name="user_name"
          className="w-full h-9 px-2 border border-gray-300 rounded focus:border-teal-500 outline-none"
        />
        <label className="font-semibold">Email</label>
        <input
          type="email"
          name="user_email"
          className="w-full h-9 px-2 border border-gray-300 rounded focus:border-teal-500 outline-none"
        />
        <label className="font-semibold">Message</label>
        <textarea
          name="message"
          className="w-full h-24 px-2 border border-gray-300 rounded focus:border-teal-500 outline-none resize-none"
        />
        <input
          type="submit"
          value="Send"
          className="mt-4 py-2 px-4 bg-orange-500 text-white border-none rounded cursor-pointer hover:bg-orange-600"
        />
      </form>
    </div>
    <GFOOTER/>
    </>
  );
};

export default Contact;
