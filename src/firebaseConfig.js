import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAtzuz8RTA8Z2VywI551ROuimmrFATBAnA",
  authDomain: "ezfood-app-cbfb8.firebaseapp.com",
  projectId: "ezfood-app-cbfb8",
  storageBucket: "ezfood-app-cbfb8.appspot.com",
  messagingSenderId: "629699639671",
  appId: "1:629699639671:web:5ed1e43e931ba32bc54972"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };