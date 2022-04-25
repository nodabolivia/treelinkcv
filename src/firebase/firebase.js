import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL, getBytes } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, setDoc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


export async function userExists(uid) {
    const docRef = doc(db, "users", uid);
    const res = await getDoc(docRef);
    console.log(res);
    return res.exists();
}

export async function existUsername(username) {
    try {
        const users = [];
        const docsRef = collection(db, 'users');
        const q = query(docsRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });
        return users.length > 0 ? users[0].uid : null;

    } catch (error) { }
}

export async function registerNewUser(user) {
    try {
        const collectionRef = collection(db, 'users');
        const docRef = doc(collectionRef, user.uid);
        await setDoc(docRef, user);
    } catch (error) {
    }
}
export async function logout(){
    try {
        await auth.signOut()
    } catch (error) {
        
    }
}


export async function updateUser(user) {
    try {
        const collectionRef = collection(db, 'users');
        const docRef = doc(collectionRef, user.uid);
        await setDoc(docRef, user);
    } catch (error) {
    }
}
export async function getUserInfo(uid) {
    try {
        const docRef = doc(db, 'users', uid);
        const document = await getDoc(docRef);
        return document.data();

    } catch (error) {
    }
}


export async function insertNewLink(link) {
    try {
        const docRef = collection(db,"links");
        const res = await addDoc(docRef, link);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
}

export async function getLinks(uid){
    const links = [];
    try{
        const collectionRef = collection(db,"links");
        const q = query(collectionRef, where("uid","==", uid ));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
            const link = {...doc.data()};
            link.docId = doc.id;
            links.push(link);
        });
        return links;
    } catch(error){
        console.error(error);
    }
}
export async function updateLink(docId, link){
    try {
        const docRef = doc(db,'links',docId);
        const res = await setDoc(docRef, link);
        return res; 
    } catch (error) {
        console.error(error);
    }
}
export async function deleteLink(docId){
    try {
        const docRef = doc(db, 'links', docId);
        const res = await deleteDoc(docRef);
        return res;
    } catch (error) {
        console.error(error);
    }
}

export async function setUserProfilePhoto(uid,file){
    try {
        const imageRef = ref(storage,`images/${uid}`);
        const resUpload = await uploadBytes(imageRef,file);
        return resUpload;   
    } catch (error) {
        console.error(error);
    }
} 
export async function getProfilePhotoUrl(profilePicture){
    try{
        const imageRef = ref(storage,profilePicture);
        const url = await getDownloadURL(imageRef);
        return url;
    }catch(error){
        console.error(error);
    }
}
export async function getUserPublicProfileInfo(uid){
    const profileInfo = await getUserInfo(uid);
    const linksInfo = await getLinks(uid);
    return {
     profileInfo:profileInfo,
     linksInfo:linksInfo   
    }

}








