const firebaseConfig = {
    apiKey: "AIzaSyAyzXtZd8w1FxfEp_KeNqfXlVieDY8MvG0",
    authDomain: "goodbank-d8d18.firebaseapp.com",
    projectId: "goodbank-d8d18",
    storageBucket: "goodbank-d8d18.appspot.com",
    messagingSenderId: "612884250368",
    appId: "1:612884250368:web:21df86dda29ed12a2ebde5",
    measurementId: "G-E2SC00JT8S"
  };

firebase.initialize(firebaseConfig);

getAuth()
  .createUser({
    email: 'user@example.com',
    emailVerified: false,
    phoneNumber: '+11234567890',
    password: 'secretPassword',
    displayName: 'John Doe',
    photoURL: 'http://www.example.com/12345678/photo.png',
    disabled: false,
  })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully created new user:', userRecord.uid);
  })
  .catch((error) => {
    console.log('Error creating new user:', error);
  });

  getAuth();