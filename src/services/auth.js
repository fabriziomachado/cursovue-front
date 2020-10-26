
const users = [
    { username: 'admin', password: 'admin', token: 'token-a'},
    { username: 'user', password: 'user', token: 'token-b'},
  ]
  
  
export function login(username, password) {
    const user = users.find(user => user.username === username)
    if(user && user.password === password){
      localStorage.setItem('token', user.token)
      return true
    }
  
    return false
}
  
export function logout(callback) {
    localStorage.removeItem('token')
    if(callback) callback()
}
  
export function isLogged() {
    return !!localStorage.getItem('token') //
}