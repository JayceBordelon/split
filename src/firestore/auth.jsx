import { app, auth } from "./initialize";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export const registerUser = (email, password) => {
    const firestore = getFirestore(app);

    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed up 
            const user = userCredential.user;

            // Create a user document in Firestore
            const userDocRef = doc(firestore, "users", user.uid);
            await setDoc(userDocRef, {
                // Add any user fields you need here
                email: user.email,
                // ...other fields
            });

            // Store user_id in localStorage
            localStorage.setItem('user_id', user.uid);

            resolve(user); // Resolve with the user object
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            reject(error); // Reject with the error object
        });
    });
}

export const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User logged in
            const user = userCredential.user;

            // Optionally, store user_id in localStorage
            localStorage.setItem('user_id', user.uid);

            resolve(user); // Resolve with the user object
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            reject(error); // Reject with the error object
        });
    });
}