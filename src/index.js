import React from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import App from "./App";

const app = initializeApp({
  apiKey: "AIzaSyCC29inb1NtWx0pYijnaHSMbO9eDoeCSdM",
  authDomain: "chat-react-fa7e5.firebaseapp.com",
  projectId: "chat-react-fa7e5",
  storageBucket: "chat-react-fa7e5.appspot.com",
  messagingSenderId: "108309639575",
  appId: "1:108309639575:web:02402583696cfa8f7554d2",
  measurementId: "G-FE8ENKKFBW",
});

export const Context = React.createContext(null);
const auth = getAuth(app);
const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      auth,
      db,
    }}
  >
    <App />
  </Context.Provider>
);
