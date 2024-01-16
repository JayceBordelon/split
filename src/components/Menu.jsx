import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <button onClick={() => toggleMenu()} className={isOpen ? "md:hidden" : " "}>
          <img src="https://dementiainmyfamily.org.au/site/wp-content/themes/dementiainmyfamily2021/assets/png/brain-lobes.png" alt="Menu" className="w-10 h-10" />
        </button>

        <ul className={`flex justify-between items-center space-x-8 ${isOpen ? '' : 'hidden'}`}>
          <li><h4><Link to="/home" className={`underline hover:text-blue-400 ${isOpen ? '' : 'hidden'}`}>Home</Link></h4></li>
          <li><h4><Link to="/food" className={`underline hover:text-blue-400 ${isOpen ? '' : 'hidden'}`}>Food</Link></h4></li>
          <li><h4><Link to="/trades" className={`underline hover:text-blue-400 ${isOpen ? '' : 'hidden'}`}>Trades</Link></h4></li>
        </ul>

        <h4><Link to="/logout" className={`underline hover:text-blue-400 ${isOpen ? '' : 'hidden'}`}>Log Out</Link></h4>
      </div>
    </nav>
  );
}
