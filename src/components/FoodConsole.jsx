import React, { useState, useEffect } from 'react';
import { app } from '../firestore/initialize';
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
// Firestore functions
import { addFood } from '../firestore/food';

export default function FoodConsole() {
  // Adding food console
  const [showAddFood, setShowAddFood] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [foodDesc, setFoodDesc] = useState('');
  const [isMeal, setIsMeal] = useState(false);
  const [foodLog, setFoodLog] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      console.log("User ID is missing");
      return;
    }

    const firestore = getFirestore(app);
    const userDocRef = doc(firestore, "users", userId);

    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      const userData = doc.data();
      if (userData && userData.foodLog) {
        setFoodLog(userData.foodLog);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleSubmitFood = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("user_id");
    if (!userId) {
      alert("User ID is missing");
      return;
    }

    const newFoodEntry = {
      userId,
      foodName,
      foodDesc,
      isMeal
    };

    try {
      await addFood(newFoodEntry);
      alert('Food added successfully');
      setFoodName('');
      setShowAddFood(false);
    } catch (error) {
      console.error("Error adding food: ", error);
      alert('Error adding food');
    }
  };

  // const handleEditFood = () => {
  //   // TODO
  // }

  // const handleDeleteFood = () => {
  //   // TODO
  // }

  return (
    <div className="bg-gray-900 text-white font-sans min-h-screen flex justify-center">

      {/* Left */}
      <div className="w-full md:h-full md:w-full bg-gray-900">
        {showAddFood && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-900 rounded-lg shadow-xl p-6 max-w-sm w-full">
              <h2 className="text-2xl font-bold mb-4">Add Food/Meal</h2>
              <form onSubmit={handleSubmitFood}>
                <textarea
                  className="mb-2 p-2 border rounded w-full text-gray-900"
                  value={foodDesc}
                  onChange={e => setFoodDesc(e.target.value)}
                  placeholder="Enter all items here as a string of all that you ate (e.g., one cup of rice, one cup of broccoli...)"
                  required
                  rows="10"
                />

                {/* Checkbox for saving as a meal */}
                <div className="mb-4">
                  <label>
                    <input
                      type="checkbox"
                      checked={isMeal}
                      onChange={e => setIsMeal(e.target.checked)}
                      className="mr-2"
                    />
                    Save as a meal
                  </label>
                </div>

                {/* Conditional input for Meal Name */}
                {isMeal && (
                  <label className="block mb-4">
                    Meal Name
                    <input
                      type="text"
                      value={foodName}
                      onChange={e => setFoodName(e.target.value)}
                      className="block w-full p-2 border rounded mt-1 text-gray-900"
                      required={isMeal} // Make it required only if isMeal is true
                    />
                  </label>
                )}

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Save
                </button>
                <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => setShowAddFood(false)}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        {/* <button
          onClick={() => setShowAddFood(!showAddFood)}
          className="bg-green-500 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2">Log Food</button>
        <div className="w-full p-4">
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr>
                <th className="w-1/4">Food Description</th>
                <th className="w-1/6">Calories</th>
                <th className="w-1/6 hidden md:table-cell">Protein(g)</th>
                <th className="w-1/6 hidden md:table-cell">Carbs(g)</th>
                <th className="w-1/6 hidden md:table-cell">Fats(g)</th>
                <th className="w-1/6 hidden md:table-cell">Sugar(g)</th>
                <th className="w-1/6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foodLog.map((food, index) => (
                <tr key={index} className="border-t border-gray-400">
                  <td className="text-center">{food.desc}</td>
                  <td className="text-center">{food.macros.Calories}</td>
                  <td className="text-center hidden md:table-cell">{food.macros.Protein}</td>
                  <td className="text-center hidden md:table-cell">{food.macros.Carbs}</td>
                  <td className="text-center hidden md:table-cell">{food.macros.Fats}</td>
                  <td className="text-center hidden md:table-cell">{food.macros.Sugar}</td>
                  <td className="text-center">
                    <button onClick={() => handleEditFood(food)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                    <button onClick={() => handleDeleteFood(food)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div> */}

      </div>
    </div>
  );
}
