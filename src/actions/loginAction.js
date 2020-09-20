export function login(isAdmin){
  return {
    type: 'LOGIN',
    isAdmin
  }
}