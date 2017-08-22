//////////////////////dal.js///////////////////////////
///////////////////////////////////////////////////////
let users = require('./data.js')
//==============RENDER LOGIN PAGE ====================

function getAllUsers() {
  return users;
}

function getByUsername (usrNm) {
  return users.find(function (usr, idx, arr){
    usrNm === usr.username;
  })
}



module.exports = {
  getByUsername: getByUsername,
  getAllUsers: getAllUsers
}
