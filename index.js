require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const dal = require('./dal');

app.use(express.static(path.join(__dirname, 'build')));

/*/app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'front/build/index.html'));
});*/

app.get('/account/login/:email/:password', function (req, res) {

  dal.find(req.params.email)
      .then((user) => {

          // if user exists, check password
          if(user.length > 0){
              if (user[0].password === req.params.password){
                  res.json({"logged_in":true});
              }
              else{
                res.json({"logged_in":false, "reason":"Password entered is incorrect."});
              }
          }
          else{
            res.json({"logged_in":false, "reason":"User not found. Please create an account before trying to log in."});
          }})
      .catch(e => {
        console.log(e);
        res.json({"logged_in":false, "reason":"Sorry something went wrong. Please try again later"});
      })
  
});

// find user account
app.get('/account/find/:email', function (req, res) {

  dal.find(req.params.email)
      .then((user) => {
          console.log(user);
          res.send(user)})
      .catch(e =>{
        console.log(e);
        res.send('Something went wrong...')
      })
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

  dal.findOne(req.params.email)
      .then((user) => {
          console.log(user);
          res.send(user)})
      .catch(e =>{
        console.log(e);
        res.send('Something went wrong...')
      })
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount/:type/:event', function (req, res) {

  const formatMin = (n) => {
    if (n<10){
      return `0${n}`;
    }
    else{
      return n;
    }
  }

  const formatHour = (n) => {
    if(n<12){
      return "AM";
    }
    else{
      return "PM";
    }
  }

  const d = new Date();

  //0-11
  let month = d.getMonth() + 1;
  
  //1-31
  let day = d.getDate();
  
  //1000-9999
  let year = d.getFullYear();
  
  //0-23
  let hour = d.getHours();
  
  //0-59
  let minutes = formatMin(d.getMinutes());

  var amount = Number(req.params.amount);
  const event = {type:req.params.event, user:req.params.email, amount, time:`${month}/${day}/${year}, ${hour}:${minutes} ${formatHour(hour)} UTC`}

  dal.update(req.params.email, amount, req.params.type, event)
      .then((response) => {
        console.log(response)
          if((response)&&(response._id)){
            res.send({'updated':true})
          }
          else{
            res.send({'updated':false})
          }
        })
      .catch(e =>{
        console.log(e);
        res.send('Something went wrong...')
      })   
});

// all accounts
app.get('/account/all', function (req, res) {

  dal.all()
      .then((docs) => {
          console.log(docs);
          res.send(docs)})
      .catch(e =>{
        console.log(e);
        res.send('Something went wrong...')
      })
});

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {

  // check if account exists
  dal.find(req.params.email)
      .then((users) => {
         // if user exists, return error message
          if(users.length > 0){
              console.log('User already in exists');
              res.json({'existing-user':true});    
          }
          else{
              // else create user
              dal.create(req.params.name,req.params.email,req.params.password)
                  .then((user) => {
                      console.log(user);
                      res.send(user);            
                  })
                  .catch(e =>{
                    console.log(e);
                    res.json({'internal-error':true});
                  })            
          }

      })
      .catch(e =>{
        console.log(e);
        res.json({'internal-error':true});
      })
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
