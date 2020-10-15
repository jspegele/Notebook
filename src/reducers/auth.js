export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.payload.uid,
        displayName: action.payload.displayName,
        email: action.payload.email,
        photoURL: action.payload.photoURL
      }
    case 'LOGOUT':
      return {}
    default:
      return state
  }
}
