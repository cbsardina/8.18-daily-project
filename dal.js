//////////////////////dal.js///////////////////////////
///////////////////////////////////////////////////////

let users = require('./data.js')
//==============RENDER LOGIN PAGE ====================

function getAllUsers(){
  return users;
}

function isUser(usrNm) {
  let user = '';
  for(let i in users) {
    if(usrNm === users[i].username) {
      user = users[i];
    }
  }
  return user;
}

function getByUsername (usrs) {
  let getUsrNm = users.find(isUser);
  console.log('getByUsername =>' + getUsrNm);
  return getUsrNm;
}

//=================================================
module.exports = {
  getByUsername, getAllUsers, isUser,
}
