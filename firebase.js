const firebaseConfig = {
  apiKey: "AIzaSyB6WdD4hjf9LI9w3o5d2zLrtvL9JBRjNOI",
  authDomain: "controle-supermercado.firebaseapp.com",
  projectId: "controle-supermercado",
  storageBucket: "controle-supermercado.appspot.com", // <-- Corrigido aqui
  messagingSenderId: "437292484626",
  appId: "1:437292484626:web:5cdb07c2f03c8e050730cb"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = firebase.firestore();
