import CustomInput from "@/components/CustomInput";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Form from "./Form";

type Props = {};

export default function Login({}: Props) {
  return (
    <main className="container px-6 lg:px-14 max-w-lg mx-auto flex flex-col justify-center gap-3 w-full h-[90vh]">
      <div className="">
        <h1 className="text-2xl font-semibold">Welcome back 👋</h1>
        <p>Enter the information you entered while registering</p>
      </div>

      <div className="">
        {/* {error && <div className="text-red-500 font-medium">{error}</div>} */}

        <Form />
        <button
          // onClick={signInWithGoogle}
          className="w-full flex justify-center items-center mt-4 gap-4 border border-gray-500 py-2 font-medium rounded-lg hover:border-2"
        >
          <Image
            width={24}
            height={24}
            src="/google-icon.png"
            className="w-6 h-6"
            alt="google icon"
          />
          Login with Google
        </button>

        <p className="text-center mt-10">
          Don't have an account?{" "}
          <Link href="/signup" className="underline font-bold">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
