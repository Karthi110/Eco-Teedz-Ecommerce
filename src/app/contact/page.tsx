"use client";
import MaxWidthWrapper from "@/components/root/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import React from "react";
const ContactPage = () => {
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., send data to backend)
    console.log("Form submitted!");
  };

  return (
    <MaxWidthWrapper>
      <div className="py-8">
        <h1 className="text-3xl md:text-5xl font-semibold mb-4">Contact Us</h1>
        <p className="text-lg mb-8">
          Have a question or feedback? Send us a message!
        </p>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-lg mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              required
            />
          </div>
          <button
            type="submit"
            className={buttonVariants({
              size: "lg",
              className: "w-full",
            })}
          >
            Send Message
          </button>
        </form>
      </div>
    </MaxWidthWrapper>
  );
};

export default ContactPage;
