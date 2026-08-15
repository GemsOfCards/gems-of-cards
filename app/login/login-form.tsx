"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setMessage("Please enter both your email and password.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        setMessage(error.message || "Unable to sign in. Please check your email and password.");
        return;
      }

      if (!data.session) {
        setMessage("Sign-in succeeded, but no session was created. Please try again.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong while signing in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin} className="login-form">
      <label>
        EMAIL
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
          disabled={loading}
        />
      </label>

      <label>
        PASSWORD
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
          disabled={loading}
        />
      </label>

      {message && <p className="login-status" role="alert">{message}</p>}

      <button className="btn" type="submit" disabled={loading}>
        {loading ? "ENTERING VAULT..." : "ENTER VAULT"}
      </button>
    </form>
  );
}
