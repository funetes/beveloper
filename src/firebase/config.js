import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBqJGvTNk2CH36Vz_0CCehrP01ECKIFWcQ',
  authDomain: 'beveloper.firebaseapp.com',
  databaseURL: 'https://beveloper.firebaseio.com',
  projectId: 'beveloper',
  storageBucket: 'beveloper.appspot.com',
  messagingSenderId: '499681008062',
  appId: '1:499681008062:web:dc9ea5af0dce78de0e01ef',
  measurementId: 'G-EGL1N7VKCL',
};

export default firebase.initializeApp(firebaseConfig);
