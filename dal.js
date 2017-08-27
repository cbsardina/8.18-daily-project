//////////////////////dal.js///////////////////////////

let users = require('./data.js')

// GET A USER
function getUser(usrNm) {
   let user = '';
   for(let i in users) {
     if(usrNm === users[i].username) {
       user = users[i];
     }
   }
   return user;
  }

// ADD A USER
  function addUsr (newFirstNm, newLastNm, newUsrNm, newPass) {
    let newUser = {id: users.length +1, name_first: newFirstNm, name_last: newLastNm, username: newUsrNm, password: newPass };
    users.push(newUser);
}

//========== EXPORTS ===============
module.exports = { getUser, addUsr }
