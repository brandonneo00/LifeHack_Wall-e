import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";
// firebase imports
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const useCollection = (c, _q) => {
  const [documents, setDocuments] = useState(null);

  //setting up query
  const q = useRef(_q).current;

  useEffect(() => {
    // we use let here because we might change the collection
    // later on when dealing with queries
    // first argument in collection function is the database object we want to connect to
    // second argument is the name of the collection we want ot connect to
    let ref = collection(db, c);

    if (q) {
      ref = query(ref, where(...q));
    }

    // setting up the real time listener
    // first argument is the reference, ref
    // second argument is a function that fires everytime we get a change in data in the collection
    // and also when we initially fetch the data
    // we need unsubscribe tho stop when the real-time data amounts
    const unsub = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      // using setDocuments function to update the array
      setDocuments(results);
    });

    return () => unsub();
  }, [c, q]);
  return { documents };
};

// we will use the doc.id as a key later on
