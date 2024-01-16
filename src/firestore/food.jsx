import { getGptResponse } from "./gpt";
import { app } from "./initialize";
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

export const getFoodAnalysisFromGpt = async(food) => {
    const prompt = `In a JSON form (Do not include any other text than the JSON), please indicate how the total macros of ${food} in the form of{\n\t"Calories"\n\t"Protein"\n\t"Carbs"\n\t"Fats"\n\t"Sugar"}. If multiple foods are indicated, return only the total sums of each of these macro nutrients.`;
    const res = await getGptResponse(prompt);
    return res;
    
}

export const addFood = async (food) => {
    const firestore = getFirestore(app);
    const { foodDesc, foodName, isMeal, userId } = food;
  
    const gpt_analysis = await getFoodAnalysisFromGpt(foodDesc);
    let macrosJson = JSON.parse(gpt_analysis.choices[0].message.content);
  
    // User document reference
    const userDocRef = doc(firestore, "users", userId);
  
    try {
      // Get current user data
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
  
      const userData = userDoc.data();
  
      // Updating the user's data
      const updatedUserData = {};

      // Append new food log entry
      updatedUserData.foodLog = arrayUnion({ 
        desc: foodDesc, macros: macrosJson, date: new Date().toISOString().split('T')[0], _id: Math.random().toString(36).substring(2, 10)
      });
  
      if (isMeal) {
        // Append new meal to the meals array
        updatedUserData.meals = arrayUnion({ [foodName]: {macros: macrosJson, desc: foodDesc} });
      }

  
      await updateDoc(userDocRef, updatedUserData);
    } catch (error) {
      console.error("Error in addFood: ", error);
      throw error;
    }
  }

