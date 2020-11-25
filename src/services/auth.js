import { getClient } from './http'

//const users = [
//    { username: 'admin', password: 'admin', token: 'token-a'},
//    { username: 'user', password: 'user', token: 'token-b'},
//  ]


  
export async function login(email, password) {
    
    //const user = users.find(user => user.email === email)
    const client = getClient()

    const { data: response } = await client.post('/login', {
      email,
      password
    })
    console.log(response.status);
    
    //if(user && user.password === password){
    if( response.status == 'success' ){
      localStorage.setItem('token', response.data.token)
      return true
    }

    throw new Error({response}) //return false
}

export function getToken() {
  return localStorage.getItem('token')
}
  
export function logout(callback) {
    localStorage.removeItem('token')
    if(callback) callback()
}
  
export function isLogged() {
    return !!localStorage.getItem('token') //
}