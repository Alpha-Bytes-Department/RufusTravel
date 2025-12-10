"use client";

import React, { useState } from "react";
import { MessageSquare, Send, Clock4, Headphones } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactForm = () => {
  // ===============================Form State==============================
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // ===============================Handle Input Change==============================
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ===============================Handle Submit==============================
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", formData);
    // TODO: Implement API call
    alert("Message sent successfully!");
  };

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-[80vw]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* ===============================Contact Form============================== */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
            {/* ===============================Form Header============================== */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg ">
                <MessageSquare className="size-8 text-yellow-600" />
              </div>
              <h2 className="font-bold text-xl text-gray-900 sm:text-2xl">
                Send Us a Message
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* ===============================Name Fields============================== */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Akash"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="bg-gray-50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Saha"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="bg-gray-50"
                    required
                  />
                </div>
              </div>

              {/* ===============================Email Address============================== */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-gray-50"
                  required
                />
              </div>

              {/* ===============================Phone Number============================== */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-gray-50"
                  required
                />
              </div>

              {/* ===============================Subject============================== */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="bg-gray-50"
                  required
                />
              </div>

              {/* ===============================Message============================== */}
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="min-h-[120px] resize-none bg-gray-50"
                  required
                />
              </div>

              {/* ===============================Submit Button============================== */}
              <Button
                type="submit"
                className="h-12 w-full text-lg rounded-lg bg-yellow-500 font-semibold text-gray-900 hover:bg-yellow-600"
              >
                <Send className="mr-2 size-5" />
                Send Message
              </Button>
            </form>
          </div>

          {/* ===============================Right Side Info============================== */}
          <div className="space-y-6">
            {/* ===============================Business Hours============================== */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg ">
                  <Clock4 className="size-8 text-yellow-600" />
                </div>
                <h3 className="font-bold text-xl text-gray-900">
                  Business Hours
                </h3>
              </div>

              <div className="space-y-3 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium text-gray-900">
                    9:00 AM - 8:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium text-gray-900">
                    10:00 AM - 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium text-gray-900">
                    10:00 AM - 4:00 PM
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-yellow-50 p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">
                    Emergency Support:
                  </span>{" "}
                  Available 24/7 for urgent travel assistance
                </p>
              </div>
            </div>

            {/* ===============================Need Immediate Help============================== */}
            <div className="rounded-2xl bg-linear-to-br text-yellow-900 from-yellow-400 to-yellow-500 p-6 shadow-lg sm:p-8">
              <div className="mb-4 flex items-center gap-3">
                <Headphones className="size-8 " />
                <h3 className="font-bold  text-xl">Need Immediate Help?</h3>
              </div>

              <p className="mb-6  text-sm sm:text-base">
                Chat with our AI assistant for instant answers to your
                questions, or speak with a travel expert right away.
              </p>

              <Button className="h-12 w-full rounded-lg bg-white font-semibold text-lg text-yellow-700 hover:bg-gray-100">
                Start Live Chat
              </Button>
            </div>

            {/* ===============================FAQ Section============================== */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
              <h3 className="mb-4 font-bold text-xl text-gray-900">
                Frequently Asked Questions
              </h3>

              <div className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-1 font-semibold text-gray-900 text-sm sm:text-base">
                    How do I modify my booking?
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Visit your dashboard or contact our support team
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-1 font-semibold text-gray-900 text-sm sm:text-base">
                    What's your cancellation policy?
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Free cancellation up to 24 hours before departure
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-1 font-semibold text-gray-900 text-sm sm:text-base">
                    How do I earn rewards points?
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Earn points on every booking automatically
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
