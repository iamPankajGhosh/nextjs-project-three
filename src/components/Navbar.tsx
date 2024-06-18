"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { User } from "next-auth";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-100">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="#" className="text-xl font-bold mb-4 md:mb-0">
          Mystery Message
        </a>
        {session ? (
          <>
            <span className="mr-4">Welcome, {user.username ?? user.email}</span>
            <Button onClick={() => signOut()} variant="default">
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button variant="default">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
