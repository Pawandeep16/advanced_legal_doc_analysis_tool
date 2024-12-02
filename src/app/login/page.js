"use client";
import React, { useEffect, useState } from "react";
import eyeIcon from "../Assets/icons/eye-43.png";
import fb from "../Assets/icons/fb.png";
import dynamic from 'next/dynamic';
import google from "../Assets/icons/google.webp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "../Component/Header";
import Logo from "../Assets/icons/Logo_dark.svg";
import { getProviders, signIn, useSession } from "next-auth/react";
import axios from "axios";

import animationData from "../Assets/aniamtion/googleLoad.json";
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

function Page() {
  const [isClient, setIsClient] = useState(false); // To handle client-side rendering
  const [signUp, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { data: session, status } = useSession();
  const router = useRouter();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // Proper animation data import
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    if (status === "authenticated") {
      if (signUp) {
        registerUserWithGoogle();
      } else {
        signInUserWithGoogle();
      }
    }
  }, [status, session, signUp, router]);

  const registerUserWithGoogle = async () => {
    setLoading(true);
    if (status === "authenticated" && session?.user) {
      const { email, name } = session.user; // Get email and name from session
      try {
        const response = await axios.post("http://localhost:5000/api/user/registerUser", {
          email,
          fullName: name,
          isGoogleUser: true,
        });
        localStorage.setItem("userToken", response?.data?.token);
        router.push("/");
      } catch (err) {
        console.error("Error during Google sign-up:", err.response?.data || err.message);
      }
    }
  };

  const signInUserWithGoogle = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/user/loggedInUser", {
        email: session?.user?.email,
        isGoogleUser: true,
      });
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      setLoading(false);
      router.push("/");
    } catch (err) {
      console.error("Error during Google sign-in:", err);
    }
  };

  const signUpWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/login" });
  };

  const signUpWithCred = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const data = { email, password, fullName: name };
      const response = await axios.post("http://localhost:5000/api/user/registerUser", data);
      localStorage.setItem("user", JSON.stringify({ token: response.data.token, email: response.data.user.email, name: response.data.user.fullName }));
      router.push("/");
    } catch (err) {
      console.error("Error during sign-up:", err.response?.data || err.message);
    }
  };

  const signInWithCred = async () => {
    try {
      const data = { email, password };
      const response = await axios.post("http://localhost:5000/api/user/loggedInUser", data);
      localStorage.setItem("user", JSON.stringify({ token: response.data.token, email: response.data.user.email, id: response.data.user.id }));
      router.push("/");
    } catch (err) {
      console.error("Error during sign-in:", err.response?.data || err.message);
    }
  };

  return (
    <>
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      ) : (
        <div>
          <Header />
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-[30%] flex flex-col items-center justify-center space-y-[30px]">
              <div className="space-y-[15px]">
                <div className="flex space-x-2">
                  <h1 className="text-5xl text-[#1f3e57]">
                    {signUp ? "Sign Up" : "Login"} to
                  </h1>
                  <Logo className="e-x-10 w-[300px] h-[60px]" />
                </div>
                <p className="text-gray-400 text-[20px] text-center">Welcome Back! Please enter your details</p>
              </div>
              <div className="w-full space-y-[20px]">
                {signUp && (
                  <div className="space-y-[15px]">
                    <p className="text-[20px] text-[#4f4f4f] font-semibold">Full Name</p>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-[20px] py-3 outline-none rounded-lg border border-gray-500"
                      type="text"
                      placeholder="Enter your username or email"
                      required
                    />
                  </div>
                )}
                <div className="space-y-[15px]">
                  <p className="text-[20px] text-[#4f4f4f] font-semibold">Username or Email</p>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-[20px] py-3 outline-none rounded-lg border border-gray-500"
                    type="email"
                    placeholder="Enter your username or email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-[20px] text-[#4f4f4f] font-semibold">Password</p>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-[20px] py-3 outline-none rounded-lg border border-gray-500"
                    type="password"
                    placeholder="Enter your Password"
                    required
                  />
                </div>
                {signUp && (
                  <div className="space-y-2">
                    <p className="text-[20px] text-[#4f4f4f] font-semibold">Confirm Password</p>
                    <input
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-[20px] py-3 outline-none rounded-lg border border-gray-500"
                      type="password"
                      placeholder="Enter your Password"
                      required
                    />
                  </div>
                )}
              </div>
              {signUp ? (
                <button
                  onClick={signUpWithCred}
                  className="bg-[#1f3e57] w-full px-1 py-[15px] rounded-lg text-white font-semibold active:scale-90 transition duration-200 ease-in-out"
                >
                  Sign Up
                </button>
              ) : (
                <button
                  onClick={signInWithCred}
                  className="bg-[#1f3e57] w-full px-1 py-[15px] rounded-lg text-white font-semibold active:scale-90 transition duration-200 ease-in-out"
                >
                  Sign In
                </button>
              )}
              {signUp ? (
                <p className="text-[16px] text-[#4f4f4f]">
                  Already have an account?
                  <span
                    onClick={() => setSignUp(false)}
                    className="text-blue-700 font-semibold ml-2 cursor-pointer"
                  >
                    login
                  </span>
                </p>
              ) : (
                <p className="text-[16px] text-[#4f4f4f]">
                  Don&apos;t have an account yet?
                  <span
                    onClick={() => setSignUp(true)}
                    className="text-blue-700 font-semibold ml-2 cursor-pointer"
                  >
                    Sign up
                  </span>
                </p>
              )}
              <div className="flex items-center justify-center space-x-[15px]">
                <button
                  onClick={signUpWithGoogle}
                  className="text-center flex justify-center space-x-4 bg-[#db4437] text-white rounded-md w-full py-[15px]"
                >
                  <Image src={google} alt="Google" width={20} height={20} />
                  <span>Sign Up with Google</span>
                </button>
                <button
                  onClick={signUpWithGoogle}
                  className="text-center flex justify-center space-x-4 bg-[#4267B2] text-white rounded-md w-full py-[15px]"
                >
                  <Image src={fb} alt="Facebook" width={20} height={20} />
                  <span>Sign Up with Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
