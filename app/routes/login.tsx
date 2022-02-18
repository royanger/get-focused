export default function Login() {
  return (
    <>
      <h1>Login Error</h1>
      <p>There was a problem logging you into the site. Please try again</p>
      <form action="/auth/google" method="post">
        <button>Log In</button>
      </form>
    </>
  )
}
