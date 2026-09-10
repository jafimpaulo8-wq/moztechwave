// firebase/config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// A tua configuração exata do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBLl_5awcYgc6lz_6bGxP-dedZaVQRQi6o",
  authDomain: "siverc-94da3.firebaseapp.com",
  projectId: "siverc-94da3",
  storageBucket: "siverc-94da3.firebasestorage.app",
  messagingSenderId: "497955072458",
  appId: "1:497955072458:web:d91abbf07576328bfe4733",
  measurementId: "G-TPL8HLY27T"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar serviços e exportar para uso global
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

// Configurações de segurança do Google Auth (opcional, mas recomendado)
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

console.log("✅ SIVERC Firebase Core Inicializado com Sucesso");