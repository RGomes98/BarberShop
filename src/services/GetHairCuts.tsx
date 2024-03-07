import { redirect } from 'next/navigation';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, doc, getDocs, query, where } from "firebase/firestore";

import { getDatabase, ref, child, get } from "firebase/database";

import {auth, database, firestore} from '../firebaseConfig/firebase';

import firebase from 'firebase/app';
import { UserData } from '@/models/UserData';
import { HairCut } from '@/models/HairCut';



  const convertDocsToModel = (docs: any[]) => {
    return docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data
      } as HairCut;
    });
  };

  export const getHairCuts = async() => {

    const docSnap = await getDocs(collection(firestore, "haircuts"));
    
    if (docSnap.size > 0) {
     // console.log(docSnap.docs[0].data());
      return convertDocsToModel(docSnap.docs);
    } else {
      console.log("No such document!");
    }
  };
  

  export const getHairCut = async(id : number) => {
    const q = query(collection(firestore, "haircuts"), where("id", "==", id));

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        ...data
      } as HairCut;
    } else {
      console.log("No such document!");
    }
  };
