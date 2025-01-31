import Layout from "../components/Layout/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import './tailwind.css';
import axios from "axios";
import {  useState } from "react";
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
const Contact = () => {

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const contactSubmit = async() => {

    try {
      const response = await axios.post('https://serap-hair-studio.onrender.com/api/contact',{name,surname,phone,email,message})
      toast.success('İletişim Bilgileri Gönderildi')
      console.log(response)
    } catch (error:unknown) {
      console.log(error)
      toast.error('İletişim Bilgileri Gönderilemedi!')
    }
  }
  return (
    <Layout>
      <ToastContainer/>
      <div className="bg-[rgb(21,21,21)] min-h-screen py-10">
        <div className="container bg-[rgb(30,30,30)] p-5 mt-5 rounded-lg shadow-lg max-w-4xl mx-auto">
          <h1 className="text-center mb-[2rem] text-white font-weight-bold text-2xl">İLETİŞİM</h1>
          <form onSubmit={contactSubmit}>
            {/* Name ve Surname Alanları */}
            <div className="form-row  ">
              <div className="form-group col-md-6 mb-[2rem]">
                <label htmlFor="inputName" className="text-white font-weight-semibold">Ad:</label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className="form-control form-control-lg bg-[#e2e8f0]  border-0 shadow-sm"
                  id="inputName"
                  placeholder="Ad"
                  required
                />
              </div>
              <div className="form-group col-md-6 mb-[2rem]">
                <label htmlFor="inputSurname" className="text-white font-weight-semibold">Soyad:</label>
                <input
                  type="text"
                  onChange={(e) => setSurname(e.target.value)}
                  className="form-control form-control-lg bg-[#e2e8f0]  border-0 shadow-sm"
                  id="inputSurname"
                  placeholder="Soyad"
                  required
                />
              </div>
            </div>

            {/* Phone ve Email Alanları */}
            <div className="form-row gap-4 mb-[2rem]">
              <div className="form-group col-md-6 mb-[2rem]">
                <label htmlFor="inputPhone" className="text-white font-weight-semibold">Telefon:</label>
                <input
                  type="number"
                  
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control form-control-lg bg-[#e2e8f0] border-0 shadow-sm"
                  id="inputPhone"
                  placeholder="Telefon"
                  required
                />
              </div>
              <div className="form-group col-md-6 mb-[2rem]">
                <label htmlFor="inputEmail" className="text-white font-weight-semibold">Email:</label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control form-control-lg bg-[#e2e8f0]  border-0 shadow-sm"
                  id="inputEmail"
                  placeholder="E-posta"
                  required
                />
              </div>
            </div>

            {/* Message Alanı */}
            <div className="form-group gap-4 mb-[2rem] mb-[2rem]">
              <label htmlFor="inputMessage" className="text-white font-weight-semibold">Mesaj:</label>
              <input
                className="form-control form-control-lg bg-[#e2e8f0] pb-16  border-0 shadow-sm"
                id="inputMessage"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mesajınız..."
                required
              />
            </div>

            {/* Submit Button */}
            <div className="form-group text-center">
              <button
                type="submit"
                className="btn btn-primary text-white py-3 px-5 rounded-md shadow-md font-weight-bold w-full hover:bg-blue-600 transition-all duration-300 focus:outline-none"
              >
                Gönder
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
