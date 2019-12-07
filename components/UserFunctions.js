import axios from 'axios'

export const register = newUser => {
  return axios
    .post('/user/register', {
      uuid: newUser.uuid,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      admin: newUser.admin
    })
    .then(res => {
      console.log('Registered')
      return res
    })
    .catch(err => {
      console.log("ClientSide Error @ UserFunctions > getUsers " + err)
      return '++Error Loc 10'
    })
}

export const removeUser = userid => {
  return axios
    .post('/user/remove_user', {
      userid: userid
    })
    .then(res => {
      console.log('User Removed')
      return 1
    })
    .catch(err => {
      console.log("ClientSide Error @ UserFunctions > removeUser " + err)
      return '++Error Loc 02'
    })
}

export const getUsers = () => {
  return axios
    .post('/user/getusers')
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log("ClientSide Error @ UserFunctions > getUsers " + err)
      return '++Error Loc 07'
    })
}

export const userIsLoggedIn = () => {
  return axios
    .post('/user/islogged')
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log("UserFunctions > userIsLoggedIn ... " + err)
      return '++Error Loc 09'
    })
}

export const login = user => {
  return axios
    .post('/user/login', {
      email: user.email,
      password: user.password
    })
    .then(res => {
      localStorage.setItem('usertoken', res.data)
      return res.data
    })
    .catch(err => {
      console.log(err)
      return '++Error Loc 10'
    })
}

export const logout = () => {
  return axios
    .post('/user/logout', {
      //email: user.email
      // not passing param because the server file can access session
    })
    .then(res => {
      return 1
    })
    .catch(err => {
      console.log(err)
      return '++Error Loc 10'
    })
}


