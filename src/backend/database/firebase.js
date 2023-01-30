import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getAuth,
		GoogleAuthProvider,
        signOut
	} from 'firebase/auth';
import { serverTimestamp, collection, 
    getFirestore, addDoc, getDoc, doc, 
    query, getDocs, orderBy, onSnapshot, 
    updateDoc, deleteDoc } from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAbiGzwzAs-I20FnPxDHmLhMEBkCBE3sQY",
    authDomain: "quora-clone-11d2f.firebaseapp.com",
    projectId: "quora-clone-11d2f",
    storageBucket: "quora-clone-11d2f.appspot.com",
    messagingSenderId: "28557083844",
    appId: "1:28557083844:web:5242091bc3f72f5b533591",
    measurementId: "G-CWHM6E04JL"
};

const firebaseApp = initializeApp(firebaseConfig);                  // 파이어베이스 연결                       
const provider = new GoogleAuthProvider();    	    		 				 // 구글 로그인창 뜨게 하기
const database = getFirestore(firebaseApp);                           		             // 데이터베이스
const auth = getAuth();

export {
	provider, auth, database,
    signOut, serverTimestamp, addDoc,
    collection, getDoc, doc, query,
    getDocs, orderBy, onSnapshot,
    updateDoc, deleteDoc 
};