'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { authenticate } from '../utils/auth';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [participantId, setParticipantId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const delegate = authenticate(participantId, password);
    
    if (delegate) {
      router.push("/home");
    } else {
      setError("Invalid Participant ID or Password");
    }
  };

  return (
    <div className='h-screen flex items-center justify-center'>
      <motion.div 
        className="w-1/2 flex flex-col justify-center font-serif shadow-md bg-gray-900 h-screen"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl text-center text-white">some motivational mun nonsense</h1>
        <img 
          className="max-w-90 mr-auto ml-auto block p-4"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/UN_emblem_blue.svg/1024px-UN_emblem_blue.svg.png?20230920050537"
          alt="UN Emblem"
        />
      </motion.div>
      <motion.div 
        className="w-1/2 flex flex-col justify-center font-serif shadow-md"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="p-3 items-center justify-center flex flex-col font-extrabold text-2xl mb-4">Access your Delegation</h1>
        
        <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
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
