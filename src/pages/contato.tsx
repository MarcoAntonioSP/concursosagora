"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Header } from "@/components/Header";
import Footer from "@/components/footer/Footer";

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.mensagem) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const templateParams = {
      from_name: formData.nome,
      reply_to: formData.email,
      message: formData.mensagem,
    };

    emailjs
      .send(
        "service_06wu4lc", // Seu Service ID
        "template_e5n308a", // Seu Template ID
        templateParams,
        "Blr7jcrTJJTWwAMlZ" // Sua Public Key
      )
      .then(
        (response) => {
          alert("Mensagem enviada com sucesso!");
          setFormData({
            nome: "",
            email: "",
            mensagem: "",
          });
        },
        (error) => {
          alert("Ocorreu um erro. Por favor, tente novamente.");
        }
      );
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col mt-5 gap-8 w-full">
        <div className="text-center py-10 bg-gray-100 rounded-lg">
          <h1 className="text-3xl font-bold text-gray-800">Entre em contato</h1>
          <p className="text-lg text-gray-500 mt-2">
            Estamos aqui para ajudar. Preencha o formulário abaixo ou envie-nos um e-mail.
          </p>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 text-center py-5">Envie-nos uma Mensagem</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                type="text"
                name="nome"
                placeholder="Seu Nome"
                value={formData.nome}
                onChange={handleChange}
                className="p-3 text-base border border-gray-300 rounded-lg w-full transition duration-300 focus:border-yellow-500 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Seu E-mail"
                value={formData.email}
                onChange={handleChange}
                className="p-3 text-base border border-gray-300 rounded-lg w-full transition duration-300 focus:border-yellow-500 focus:outline-none"
              />
              <textarea
                name="mensagem"
                placeholder="Sua Mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                className="p-3 text-base border border-gray-300 rounded-lg w-full h-36 resize-vertical transition duration-300 focus:border-yellow-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-yellow-500 text-white py-4 text-lg rounded-lg transition duration-300 hover:bg-yellow-600"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 text-center py-5">Outras Formas de Contato</h2>
            <div className="flex flex-col gap-5">
              {/* <div className="flex flex-col gap-3 py-5 w-full">
                <h3 className="font-bold text-gray-700">Endereço</h3>
                <p>Ferraz de Vascocelos - SP</p>
              </div> */}
              <div className="flex flex-col  gap-3 py-5 w-full">
                <h3 className="font-bold text-gray-700">Nosso E-mail</h3>
                <p>contato@concursosagora.com.br</p>
              </div>
            </div>
            {/* <div className="flex flex-col bg-gray-100 rounded-lg">
              <h3 className="text-xl font-bold text-center m-0">Localização</h3>
              <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.083278957953!2d-46.52489182466622!3d-23.539763723168784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5c8fa0f05b5f%3A0x3e1a96b5852e7da4!2sRua%20Jorge%20Tibiri%C3%A7%C3%A1%2C%2023%20-%20Ferraz%20de%20Vasconcelos%20-%20SP%2C%2008539-000!5e0!3m2!1spt-BR!2sbr!4v1730984778476!5m2!1spt-BR!2sbr"
                  width="600"
                  height="450"
                  style={{ border: "0", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
