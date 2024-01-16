import React from 'react';

export default function PopUp({ message, setOpen }) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full m-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Notification</h2>
        <p className="text-lg mb-4 text-white">{message}</p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setOpen(false)}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}