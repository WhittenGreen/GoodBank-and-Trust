var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');
const admin   = require('./admin');
const firebase = require('firebase');
const path = require("path");
app.use(express.static('public'));
app.use(cors());

const firebaseConfig = {
    apiKey: "AIzaSyAyzXtZd8w1FxfEp_KeNqfXlVieDY8MvG0",
    authDomain: "goodbank-d8d18.firebaseapp.com",
    projectId: "goodbank-d8d18",
    storageBucket: "goodbank-d8d18.appspot.com",
    messagingSenderId: "612884250368",
    appId: "1:612884250368:web:21df86dda29ed12a2ebde5",
    measurementId: "G-E2SC00JT8S"
  };

firebase.initializeApp(firebaseConfig);

async function createFirebaseCredentials(email, password) {
    const auth  = firebase.auth();
    try {
        await auth.createUserWithEmailAndPassword(email, password);
        return '';
      } 
      catch (e) {
        console.log('createFirebaseCredentials ' + e.message);
        return e.message;
      }
}

async function createMongoUser(name, email, password) {
    try {
        await dal.create(name, email, password).
            then((user) => {
                console.log('dal ' + JSON.stringify(user));
            });
            return '';
    }
    catch (e) {
        console.log('createMongoUser ' + e.message);
        return e.message;
      }
}

//create user
app.get('/account/create/:name/:email/:password', async function (req, res) {
    console.log('create account index.js ' + req.params.email);      
    let errorMsg = await createFirebaseCredentials(req.params.email, req.params.password);
    console.log('error message ' + errorMsg);
    if (errorMsg === '') {
        errorMsg = await createMongoUser(req.params.name, req.params.email, req.params.password);
    };
    if (errorMsg === '') {
        res.send({"email": req.params.email, "error": ''});
    }else {
        console.log('create user error ' + JSON.stringify({"email": req.params.email, "error":errorMsg}));
        res.send({"email": req.params.email, "error":errorMsg});
    }
});

app.get('/account/alltransactions/:email', function(req, res) {
    try {
        dal.getAllTransactions(req.params.email).
        then((docs) => {
            console.log(docs);
            res.send(docs);
        })
    }
    catch (e) {
        console.log(e);
        res.send(e.message);
    }
})

//get all data
app.get('/account/all/:email/:password', function(req,res) {
    try {
        dal.all(req.params.email, req.params.password).
        then((docs) => {
            console.log(docs);
            res.send(docs);
        })
    }
    catch (e) {
        console.log(e);
        res.send(e.message);
      }
})

app.get('/account/login/:email/:password', function (req, res) {
    console.log('hello ' + req.params.email, req.params.password);
   try {
    executeLogin(req.params.email, req.params.password);
    async function executeLogin(email, password) {
        const auth  = firebase.auth();
        await auth.signInWithEmailAndPassword(email, password)
            .then((response) => {
                console.log('index server side res ' + JSON.stringify(response));
                response.user.getIdToken().then(token => {
                    console.log('token ' + JSON.stringify(token));
                    dal.balance(req.params.email, req.params.password).
                        then((docs) => {
                            console.log(docs);
                            res.send({"token": token, "error": '',"balance": docs});
                        })
                })
            })
            .catch((e) => {
                console.log('index login error ' + e);
                res.send({"token": '', "error": e.message,"balance": ''});
            })
    }
   } catch(e) {
    res.send({"token": '', "error": e,"balance": 0});
   }
})

//make transaction
app.get('/account/transaction/:email/:amount/:transType/:date/:balance', function (req, res) {
    const idToken = req.headers.authorization;
    console.log('route toke ' + idToken);
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            console.log('decodedToken:',decodedToken);
        })
        
    dal.transaction(req.params.email, String(req.params.balance))
    .then((result) => {
        if (result.modifiedCount === 1) {
            console.log(result);
            res.send({"status": "success"});
        } else {
            res.send({"status": "failed"});
        }
        dal.enterTransToDb(req.params.email, req.params.date, req.params.transType, String(req.params.amount))
        .then((result) => {
            if (result.modifiedCount === 1) {
                console.log(result);
                res.send({"status": "success"});
            } else {
                res.send({"status": "failed"});
            }
        })
        .catch((error) => {
            console.log('error in index ' + error);
            res.send({"status": error});
        });
    })
    .catch((error) => {
        console.log('error in index ' + error);
        res.send({"status": error});
    });
});

app.get('/account/logout', function (req, res) {
    console.log('logout route');
    const auth  = firebase.auth();
    auth.signOut()
        .then(function() {
            // Sign-out successful.
            console.log('successful logout');
            res.send({"error": ''});
        })
        .catch(function(error) {
            console.log('logout error');
            // An error happened
            res.send({"error": error});
        });
});

// Serve static files if in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("./public"));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "public", "index.html"));
    });
  }

var port = 3005;
app.listen(port);
console.log(`Running on port ${port}`);