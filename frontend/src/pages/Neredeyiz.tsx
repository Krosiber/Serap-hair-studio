import React from 'react';
import { IoLocationSharp, IoMailSharp } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import Layout from "../../src/components/Layout/Layout";
import { NextPage } from 'next';


interface data{
  icon: React.ElementType;
  title: string;
  content: string;
}
const ContactCard:NextPage<data> = ({ icon:Icon, title, content }) => (
  <div className="flex flex-col items-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 w-full sm:w-[15rem] h-auto sm:h-[15rem] justify-center text-center space-y-4 bgsss">
    <div className="p-4 bg-gray-200 rounded-full">
      <Icon className="w-16 h-16 text-gray-600" />
    </div>
    <h2 className="text-lg font-semibold text-gray-400">{title}</h2>
    <p className="text-gray-400 text-sm leading-relaxed">{content}</p>
  </div>
);

const Neredeyiz = () => {
  const contactInfo = [
    {
      icon: IoLocationSharp,
      title: "Adres",
      content: "Serap Hair Studio, Muratpaşa, Cumhuriyet Cd. 42 B, 34040 Bayrampaşa/İstanbul"
    },
    {
      icon: IoMailSharp,
      title: "Email",
      content: "seraphairstudio@gmail.com"
    },
    {
      icon: MdLocalPhone,
      title: "Phone",
      content: "+90 534 819 3008"
    }
  ];

  return (
    <Layout>
      <div className="bgsss min-h-screen">
        <div className="container mx-auto px-4 py-16">
          {/* Contact Cards Section - Now fully responsive */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 justify-center items-center mb-16">
            {contactInfo.map((info, index) => (
              <ContactCard key={index} {...info} />
            ))}
          </div>
          
          {/* Map Section */}
         
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="w-full h-[40rem]"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1504.3502379829104!2d28.904533423483368!3d41.05367875422509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab10517156317%3A0x64320036afa69e91!2sSerap%20Hair%20Studio!5e0!3m2!1str!2str!4v1738010112419!5m2!1str!2str"
              loading="lazy"
              title="Serap Hair Studio Location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
      </div>
    </Layout>
  );
};

export default Neredeyiz;