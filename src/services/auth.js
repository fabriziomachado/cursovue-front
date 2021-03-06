import { getClient } from './http'

export async function login(email, password) {

    //const user = users.find(user => user.email === email)
    const client = getClient()

    const { data: response } = await client.post('/login', {
      email,
      password
    })

    if( response.status === 'success' ){
      localStorage.setItem('token', response.data.token)
      return true
    }

    throw new Error({response})
}

export function getToken() {
  return localStorage.getItem('token')
}

export function logout(callback) {
    localStorage.removeItem('token')
    if(callback) callback()
}

export function isLogged() {
    return !!localStorage.getItem('token')
}

export async function registerUser( user ) {
  const { data } = await getClient().post('/register', user)
  return data
}

export async function getProfile() {
  const { data: response} = await getClient().get('/@me')
  return response.data
}

export async function updateProfile( profile ) {
  const { data } = await getClient().put('/@me',  profile )
  return data.data
}

export async function removeProfileImage( profile ) {
  const { data } = await getClient().delete('/@me/image', profile)
  return data
}

export async function updatePassword( passwords ) {
  console.log(JSON.stringify(passwords))
  const { data } = await getClient().put('/@me/password', passwords)
  return data

}
