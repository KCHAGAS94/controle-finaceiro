// Importando as bibliotecas do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDQABFIJrQA0E0iFvrE7FQcFC2m2lV4Vyg",
  authDomain: "lista-compra-d7ea5.firebaseapp.com",
  projectId: "lista-compra-d7ea5",
  storageBucket: "lista-compra-d7ea5.firebasestorage.app",
  messagingSenderId: "802927738925",
  appId: "1:802927738925:web:c0f902b91d9a9de7efb8a4"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
