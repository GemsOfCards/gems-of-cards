import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-card">
        <p className="eye">GEMS OF CARDS</p>
        <h1>PRIVATE VAULT</h1>
        <p className="intro">Sign in to manage your collection.</p>
        <LoginForm />
      </section>
    </main>
  );
}
