"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "../context/sessionContext";
import Image from "next/image";
import TypeWriter from "@/components/ui/typewriter";
import supabase from "@/lib/supabase";
import { useMobile } from "@/hooks/use-mobile"; // Import the mobile hook

const Login = () => {
  const [participantId, setParticipantId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [role, setRole] = React.useState("delegate");
  const router = useRouter();
  const { login } = useSession();
  const isMobile = useMobile(); // Check if the device is mobile

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const trimmedId = participantId.trim();
    const trimmedPassword = password.trim();

    try {
      if (role === "admin") {
        const { data: admin, error: adminError } = await supabase
          .from("Admin")
          .select("adminID, firstname, lastname, password")
          .eq("adminID", trimmedId)
          .single();

        if (adminError || !admin) {
          setError("Admin ID not found");
          setLoading(false);
          return;
        }

        if (admin.password !== trimmedPassword) {
          setError("Incorrect password");
          setLoading(false);
          return;
        }

        const adminUser = {
          ...admin,
          role: "admin",
        };

        login(adminUser);
        router.push("/home");
        return;
      } else if (role === "chair") {



        const { data: chair, error: chairError } = await supabase
          .from("Chair")
          .select("*")
          .eq("chairID", trimmedId)
          .single();
        if (chairError || !chair) {
          setError("Chair ID not found");
          setLoading(false);
          return;
        }
        if (chair.password !== trimmedPassword) {
          setError("Incorrect password");
          setLoading(false);
          return;
        }

        const { data: committeeID, error: IDerror } = await supabase
          .from("Committee-Chair")
          .select("chairID, committeeID")
          .eq("chairID", trimmedId)
          .single();

          if (IDerror || !committeeID) {
            setError("Committee ID not found");
            setLoading(false);
            return;
          }

          const { data: committee, error: committeeError } = await supabase
          .from("Committee")
          .select("committeeID, name")
          .eq("committeeID", committeeID.committeeID)
          .single();
        if (committeeError || !committee) {
          setError("Committee not found");
          setLoading(false);
          return;
        }

        const enrichedUser = {
          ...chair,
          committee: {
            committeeID: committee.committeeID,
            name: committee.name,
          },
        };


        login(enrichedUser);
        console.log(enrichedUser);
        router.push("/home");

      } else {
        const { data: delegate, error: delegateError } = await supabase
          .from("Delegate")
          .select("delegateID, password")
          .eq("delegateID", trimmedId)
          .single();

        if (delegateError || !delegate) {
          setError("Participant ID not found");
          setLoading(false);
          return;
        }

        if (delegate.password !== trimmedPassword) {
          setError("Incorrect password");
          setLoading(false);
          return;
        }

        const { data: fullDelegate, error: fullDelegateError } = await supabase
          .from("Delegate")
          .select("*")
          .eq("delegateID", trimmedId)
          .single();

        if (fullDelegateError || !fullDelegate) {
          setError("Delegate record not found");
          setLoading(false);
          return;
        }

        const { data: delegation, error: delegationError } = await supabase
          .from("Delegation")
          .select(`*,
            Country:countryID (countryID, name, flag),
            Committee:committeeID (committeeID, name)
          `)
          .eq("delegateID", trimmedId)
          .single();

        if (delegationError || !delegation) {
          setError("Delegation not found");
          setLoading(false);
          return;
        }

        const enrichedUser = {
          ...fullDelegate,
          country: delegation.Country,
          committee: delegation.Committee,
        };

        console.log(enrichedUser);

        login(enrichedUser);
        router.push("/home");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-black">
      <motion.div
        className="w-full md:w-1/2 flex flex-col justify-center font-serif shadow-md bg-gray-900 min-h-[40vh] md:h-screen border-b-2 md:border-b-0 md:border-r-2 border-gray-700"
        initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? -50 : 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TypeWriter />
        <Image
          width={isMobile ? 200 : 350}
          height={isMobile ? 200 : 350}
          className="mx-auto block p-4"
          src="/images/UNEMBLEM.png"
          alt="UN Emblem"
          priority
        />
      </motion.div>
      <motion.div
        className="bg-black w-full md:w-1/2 flex flex-col justify-center font-serif shadow-md py-8 md:py-0 md:h-full border-gray-700"
        initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 50 : 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="p-3 items-center justify-center flex flex-col font-extrabold text-xl md:text-2xl mb-4 text-white">
          {role === 'admin' ? 'Admin Login' : role === 'chair' ? 'Chair Login' : 'Access your Delegation'}
        </h1>

        <form
          className="flex flex-col items-center justify-center text-white px-4 md:px-0"
          onSubmit={handleSubmit}
        >
          <select
            className="border-1 cursor-pointer border-gray-800 p-2 mb-4 rounded-md w-full max-w-xs h-10 font-light bg-gray-900 text-white"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="delegate">Delegate</option>
            <option value="chair">Chair</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="text"
            placeholder={role === 'admin' ? 'Admin ID' : role === 'chair' ? 'Chair ID' : 'Participant ID'}
            className="border-1 border-gray-800 p-2 mb-4 rounded-md w-full max-w-xs h-10 font-light"
            value={participantId}
            onChange={(e) => setParticipantId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 border-gray-800 p-2 mb-4 rounded-md w-full max-w-xs h-10 font-light"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="border-2 cursor-pointer bg-white text-black border-gray-800 p-2 mb-4 rounded-md w-full max-w-xs h-10 align-middle mt-8 md:mt-12 font-extrabold"
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