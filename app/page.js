'use client'

import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home(props) {

  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (user) {
    return (
      <div>
        Hello {user.name}!
        <div>{props.children}</div>
        <a href="/api/auth/logout">Logout</a>
      </div>
    );
  }

  return (
    <a href="/api/auth/login">Login here!</a>
  )
}
