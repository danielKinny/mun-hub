"use client";
import React from "react";
import { motion } from "framer-motion";
import { authenticate } from "../utils/auth";
import { useRouter } from "next/navigation";
import { useSession } from "../context/sessionContext";
import Image from "next/image";
import TypeWriter from "@/components/ui/typewriter";

const Login = () => {
  const [participantId, setParticipantId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();
  const { login } = useSession();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const delegate = authenticate(participantId, password);

    if (delegate) {
      login(delegate);
      router.push("/home");
    } else {
      setError("Invalid Participant ID or Password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <motion.div
        className="w-1/2 flex flex-col justify-center font-serif shadow-md bg-gray-900 h-screen border-r-2 border-gray-700"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TypeWriter />
        <Image
          width={350}
          height={350}
          className=" mr-auto ml-auto block p-4"
          src="/images/UNEMBLEM.png"
          alt="UN Emblem"
        />
      </motion.div>
      <motion.div
        className=" bg-black w-1/2 flex flex-col justify-center font-serif shadow-md h-full border-gray-700"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="p-3 items-center justify-center flex flex-col font-extrabold text-2xl mb-4 text-white">
          Access your Delegation
        </h1>

        <form
          className="flex flex-col items-center justify-center text-white"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Participant ID"
            className="border-1 border-gray-800 p-2 mb-4 rounded-md w-80 h-10 font-light"
            value={participantId}
            onChange={(e) => setParticipantId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 border-gray-800 p-2 mb-4 rounded-md w-80 h-10 font-light"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="border-2 bg-white text-black border-gray-800 p-2 mb-4 rounded-md w-80 h-10 align-middle mt-12 font-extrabold"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
