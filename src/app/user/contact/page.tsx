"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import FloatingLabelInput from "@/components/new/FloatingLabelInput";
import HeroBlog from "@/components/HeroBlog";
import BtnSubmit from "@/components/new/BtnSubmit";
import Loader from "@/components/Loader";
import Btn from "@/components/Btn";
function Contact() {
  const form = useRef();
  const [loader, setloader] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setloader(true);
    console.log(form.current);

    emailjs
      .sendForm(
        "service_o1eznv3",
        "template_umhrsjr",
        form.current,
        "Cy8XM5V7jKvHyecDX"
      )
      .then(() => {
        alert("Message sent successfully!");
        form.current.reset();
        setloader(false);
      })
      .catch((error) => {
        console.error("Error:", error.text);
        setloader(false);

        alert("Failed to send message.");
      });
  };

  return (
    <div className="w-full">
      <HeroBlog
        P_BtnText={"Contact us"}
        H_Text={<>Ready to Get Started ?</>}
        M_Text={
          "We specialize in providing trusted pharmacy services that enhance your well-being, streamline your health care needs and deliver effective solutions to keep you feeling your best"
        }
        isSBtnShow={false}
        S_BtnText={"About US"}
        onpress={() => {
          window.location.href = "/about";
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full py-10 bg-gray-50 bg-opacity-50"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-[90%] md:w-[70%] xl:w-[60%] mx-auto bg-white rounded-[30px] shadow-lg p-5 md:p-10 flex flex-col gap-3 md:gap-10"
        >
          <div className="text-start">
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm md:text-[2.5rem] lg:text-[3.0rem] font-bold leading-[0.4rem] md:leading-[3.5rem] lg:leading-[4rem] capitalize"
            >
              Contact Us
            </motion.span>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[8px] md:text-[1rem] text-gray-600"
            >
              Fill out this form, and we will answer you as soon as possible!
            </motion.p>
          </div>

          <form
            ref={form}
            onSubmit={sendEmail}
            className="w-full md:border md:border-gray-200 md:px-5 md:py-5 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-5 rounded-lg"
          >
            <FloatingLabelInput
              name="firstName"
              id="firstName"
              label="First Name"
            />
            <FloatingLabelInput
              name="lastName"
              id="lastName"
              label="Last Name"
            />
            <FloatingLabelInput
              name="email"
              id="email"
              label="Email"
              type="email"
            />
            <FloatingLabelInput
              name="phone"
              id="phone"
              label="Phone"
              type="tel"
            />

            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <label
                htmlFor="writeMessage"
                className="block text-sm font-medium text-gray-700 ml-1"
              >
                Write a Message
              </label>
              <textarea
                name="message"
                id="writeMessage"
                className="block w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-none"
                rows="4"
                placeholder="Type your message here..."
                required
              />
            </div>
            {loader ? (
              <div className="w-fit">
                <Loader />
              </div>
            ) : (
              <div className="inline-flex">
                <Btn onPress={sendEmail} btnName="Submit" type="submit" />
              </div>
            )}
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Contact;
