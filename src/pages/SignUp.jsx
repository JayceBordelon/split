import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//components
import PopUp from '../components/PopUp';
//firestore
import { registerUser } from '../firestore/auth';


export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(email, password);
      if (response) {
        // Navigate to '/home' on successful registration
        navigate('/home');
      }
    } catch (error) {
      setMessage('Registration failed: ' + error.message);
      setOpen(true);
    }
  };
  

  return (
    <>
    <div className="flex justify-center items-center min-h-screen w-full bg-dark-900 text-white">
      <form 
        className="bg-dark-700 shadow-lg w-3/4 h-3/4 rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Sign Up</h2> 
        <div className="mb-4">
          <label className="text-white block text-gray-700 text-md font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email" 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="text-white block text-gray-700 text-md font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password" 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            className="bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <p>Already have an account? <a className="underline"href="/login">Login</a></p>
      </form>
      {open && <PopUp message={message} setOpen={setOpen}  />}
    </div>
    </>
  );
}