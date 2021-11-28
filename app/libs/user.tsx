import dotenv from 'dotenv'
dotenv.config()

// TODO Setup auth, then update this accordingly.

export function returnUserId() {
  return process.env.REACT_APP_TEMP_USER
}
