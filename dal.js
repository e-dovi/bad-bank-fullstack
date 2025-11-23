const { MongoClient } = require('mongodb');
const url = process.env.MONGODB_URI;

const client = new MongoClient(url);
 
// create user account
async function create(name, email, password){
  
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
   
    await client.connect();
    const db = client.db('sample_orders');
    const collection = db.collection('users');
    const doc = {name, email, password, chk_balance: 0, sv_balance:0, events:[{type:"Account Creation", user:email, amount:0, time:`${month}/${day}/${year}, ${hour}:${minutes} ${formatHour(hour)} UTC`}]};
    const value = await collection.insertOne(doc, {w:1});
    //console.log(`The value is: ${value}`)
    if(value.insertedId){
        return ({'Inserted':true});
    }
    else{
        return ({'Inserted':false});
    }    
}

// find user account
async function find(email){
    try {
        await client.connect();
        const db = client.db('sample_orders');
        const myColl = db.collection('users');
        
        const cursor = myColl.find({email: email});
        const allValues = await cursor.toArray();
        //console.log(allValues);
        return allValues;
      } catch(e){
        console.log(e)
        // Close the database connection when finished or an error occurs
        //await client.close();
      }
}


// find user account
async function findOne(email){
    try {
        await client.connect();
        const db = client.db('sample_orders');
        const myColl = db.collection('users');
        
        const cursor = myColl.find({email: email});
        const allValues = await cursor.toArray();
        //console.log(allValues);
        return allValues;
      } catch(e){
        console.log(e)
        // Close the database connection when finished or an error occurs
        //await client.close();
      }
    
}

// update - deposit/withdraw amount
async function update(email, amount, acc, event){
    let final;
    console.log(email, amount, acc, event)
    try {
        await client.connect();
        const db = client.db('sample_orders');
        const myColl = db.collection('users');
        if(acc === 'Checking'){
                final = await myColl.findOneAndUpdate(
                {email: email},
                { $inc: { chk_balance: amount}},
                { returnOriginal: false })

                if((final)&&(final._id)){
                  addEvent(email, event)
                  .then(r =>{console.log(r)})
                  .catch(e =>{console.log(e)})
                }

        }
        else if(acc === 'Saving'){
                final = await myColl.findOneAndUpdate(
                {email: email},
                { $inc: { sv_balance: amount}},
                { returnOriginal: false });

                if(final._id){
                  addEvent(email, event)
                  .then(r =>{console.log(r)})
                  .catch(e =>{console.log(e)})
                }

        }
        
       return final;
        //console.log(allValues);
        
      } catch(e){
        console.log(e)
        // Close the database connection when finished or an error occurs
        //await client.close();
      }
    
}

// all users
async function all(){
    try {
        await client.connect();
        const db = client.db('sample_orders');
        const myColl = db.collection('users');
        
        const cursor = myColl.find({});
        const allValues = await cursor.toArray();
        //console.log(allValues);
        return allValues;
      } catch(e){
        console.log(e)
        // Close the database connection when finished or an error occurs
        //await client.close();
      }

}

async function addEvent (email, event){
  let final;
  try {
    await client.connect();
    const db = client.db('sample_orders');
    const myColl = db.collection('users');
    
    const cursor = myColl.find({email: email});
    const allValues = await cursor.toArray();
    console.log(`All values length: ${allValues.length}`);
    //const events = allValues[0].events;

    //const newEvents = events.push(event);
    //console.log(`new event: ${newEvents}`);

    final = myColl.updateOne({email: email}, {$push:{events:event}});
    console.log(final);
    //console.log(allValues);
    return final;
  } catch(e){
    console.log(e)
    // Close the database connection when finished or an error occurs
    //await client.close();
  }

}

const dal = {create, findOne, find, update, all}
//export default dal;
module.exports = dal;