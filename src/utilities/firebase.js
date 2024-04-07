import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useDatabaseValue } from "@react-query-firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw8Ierr2eF4nBDr6MGf5KvykLxYXuKoes",
  authDomain: "wildhacks-2024-1.firebaseapp.com",
  databaseURL: "https://wildhacks-2024-1-default-rtdb.firebaseio.com",
  projectId: "wildhacks-2024-1",
  storageBucket: "wildhacks-2024-1.appspot.com",
  messagingSenderId: "432777637032",
  appId: "1:432777637032:web:bb42c100ddba902131269d",
  measurementId: "G-X2QQ4MS4DM"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
  const { data, isLoading, error } = useDatabaseValue([path], ref(database, path), { subscribe: true });
  const value = (!isLoading && !error && transform) ? transform(data) : data;

  return [ value, isLoading, error ];
};

export const setData = (path, value) => (
  set(ref(database, path), value)
);
