import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import { app } from "./config.js";

const db = getFirestore(app);

export async function listarServicos() {
    const snapshot = await getDocs(collection(db, "servicos"));

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}
