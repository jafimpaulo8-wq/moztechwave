// js/auth-guard.js
import { auth, db } from '../firebase/config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Função para proteger páginas
export function requireAuth(allowedRoles = ['admin', 'manager', 'user']) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      // Utilizador não está logado, mandar para o login
      window.location.href = '/login/index.html';
      return;
    }

    // Utilizador está logado, verificar permissões na Firestore
    try {
      const userDoc = await getDoc(doc(db, 'utilizadores', user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Verificar se o papel do utilizador é permitido nesta página
        if (!allowedRoles.includes(userData.role)) {
          alert("Acesso negado: Não tens permissão para ver esta página.");
          window.location.href = '/login/index.html';
          return;
        }

        // Guardar dados do utilizador na sessão para uso rápido na UI
        window.currentUser = { uid: user.uid, ...userData };
        console.log(`✅ Acesso autorizado: ${userData.nome} (${userData.role})`);
        
        // Disparar evento para a UI saber que carregou
        window.dispatchEvent(new Event('userLoaded'));
      } else {
        // Registo na Auth existe, mas não na Firestore (erro de dados)
        console.error("Erro: Utilizador não encontrado na base de dados.");
        window.location.href = '/login/index.html';
      }
    } catch (error) {
      console.error("Erro ao verificar permissões:", error);
      window.location.href = '/login/index.html';
    }
  });
}

// Função de Logout segura
export function logout() {
  if(confirm("Tens a certeza que queres terminar a sessão?")) {
    auth.signOut().then(() => {
      window.location.href = '/login/index.html';
    }).catch((error) => {
      console.error("Erro ao fazer logout:", error);
    });
  }
}