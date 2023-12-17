'use client'
import Image from "next/image";
import Link from "next/link";
import {signOut} from "next-auth/react"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
      <Link href={"/signin"}>Signin</Link>
      <Link href={"/forgot-password"}>forgot</Link>
     <button onClick={()=>signOut()}>Logout</button>
    </main>
  );
}
