//////////////////////dal.js///////////////////////////
///////////////////////////////////////////////////////

let users = require('./data.js')
//==============RENDER LOGIN PAGE ====================

function getUser(usrNm) {
   let user = '';
   for(let i in users) {
     if(usrNm === users[i].username) {
       user = users[i];
     }
   }
   return user;
  }

  function addUsr (newFirstNm, newLastNm, newUsrNm, newPass) {
    let newUser = {id: users.length +1, name_first: newFirstNm, name_last: newLastNm, username: newUsrNm, password: newPass };
    users.push(newUser);
}

//=================================================
module.exports = { getUser, addUsr }
