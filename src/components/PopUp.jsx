import React from 'react';

export default function PopUp({ message, setOpen }) {
  return (
    <div className="fixed inset-0 bg-dark-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-dark-900 rounded-lg shadow-xl p-6 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Notification</h2>
        <p className="text-lg mb-4">{message}</p>
        <button 
          className="bg-dark-700 text-white hover:bg-dark-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setOpen(false)}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
