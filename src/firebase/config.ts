import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXsMRSmNRCJqP8IJuX0cfAVoXXb2i9BUY",
  authDomain: "xiraac-407d9.firebaseapp.com",
  projectId: "xiraac-407d9",
  storageBucket: "xiraac-407d9.firebasestorage.app",
  messagingSenderId: "870092792397",
  appId: "1:870092792397:web:6959dc3116bbdea55ff204"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);