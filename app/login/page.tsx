"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "../context/sessionContext";
import Image from "next/image";
import TypeWriter from "@/components/ui/typewriter";
import supabase from "@/lib/supabase";

const Login = () => {
  const [participantId, setParticipantId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { login } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Trim the inputs to remove any accidental spaces
    const trimmedId = participantId.trim();
    const trimmedPassword = password.trim();

    try {
      // First, try to find the delegate by ID
      const { data, error: idError } = await supabase
        .from("Delegate")
        .select("*")
        .eq("delegateID", trimmedId)
        .single();

      if (idError || !data) {
        console.log("Login error:", idError);
        setError("Participant ID not found");
        setLoading(false);
        return;
      }

      // Then check if password matches
      if (data.password !== trimmedPassword) {
        setError("Incorrect password");
        setLoading(false);
        return;
      }

      // Login successful
      login(data);
      router.push("/home");
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
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
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;