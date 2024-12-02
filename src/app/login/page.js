"use client"
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
  const [isClient, setIsClient] = useState(false);  // Define the state
  const [signUp, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { data: session, status } = useSession();
  const router = useRouter();
  const provider = getProviders();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  useEffect(() => {
    setIsClient(true);  // This will run once the component is mounted
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: { animationData },
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const registerUserWithGoogle = async () => {
    setLoading(true);
    if (status === "authenticated" && session?.user) {
      const { email, name } = session.user;

      try {
        await axios.post("http://localhost:5000/api/user/registerUser", {
          email,
          fullName: name,
          isGoogleUser: true,
        }).then((data) => {
          localStorage.setItem("userToken", data?.data?.token);
        });

        router.push("/");
      } catch (err) {
        console.error("Error during Google sign-up:", err.response?.data || err.message);
      }
    }
  };

  const signInUserWithGoogle = async () => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:5000/api/user/loggedInUser`, {
        email: session?.user?.email,
        isGoogleUser: true,
      }).then((data) => {
        localStorage.setItem("token", data?.data?.token);
        localStorage.setItem("user", JSON.stringify(data?.data?.user));
      });
      setLoading(false);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      if (signUp) {
        registerUserWithGoogle();
      } else {
        signInUserWithGoogle();
      }
    }
  }, [status, session, router]);

  const signUpWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/login" });
  };

  const signUpWithCred = async (email, password, name) => {
    try {
      const data = {
        email: email,
        password,
        fullName: name,
      };

      await axios.post("http://localhost:5000/api/user/registerUser", data, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data) => {
        localStorage.setItem("user", JSON.stringify({
          token: data.data.token,
          email: data.data.user.email,
          name: data.data.user.fullName,
        }));
        router.push("/");
      });
    } catch (err) {
      console.error("Error during sign-up:", err.response?.data || err.message);
    }
  };

  const signInWithCred = async (email, password) => {
    try {
      const data = {
        email: email,
        password,
      };

      await axios.post("http://localhost:5000/api/user/loggedInUser", data, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data) => {
        localStorage.setItem("user", JSON.stringify({
          token: data.data.token,
          email: data.data.user.email,
          id: data.data.user.id,
        }));
        router.push("/");
      });
    } catch (err) {
      console.error("Error during sign-up:", err.response?.data || err.message);
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
                    {signUp ? "Sign Up" : "Login"} to{" "}
                  </h1>
                  <Logo className="e-x-10 w-[300px] h-[60px]" />
                </div>
                <p className="text-gray-400 text-[20px] text-center">
                  Welcome Back! Please enter your details
                </p>
              </div>
              <div className="w-full space-y-[20px]">
                {signUp && (
                  <div className="space-y-[15px]">
                    <p className="text-[20px] text-[#4f4f4f] font-semibold">
                      Full Name
                    </p>
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
                  <p className="text-[20px] text-[#4f4f4f] font-semibold">
                    Username or Email
                  </p>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-[20px] py-3 outline-none rounded-lg border border-gray-500"
                    type="email"
                    placeholder="Enter your username or email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-[20px] text-[#4f4f4f] font-semibold">
                    Password
                  </p>
                  <div className="flex items-center justify-between rounded-lg border border-gray-500 pr-[20px]">
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-[20px] py-3 flex-1 outline-none rounded-lg border-none text-[16px]"
                      type="password"
                      placeholder="Enter your Password"
                      required
                    />
                  </div>
                </div>
                {signUp && (
                  <div className="space-y-2">
                    <p className="text-[20px] text-[#4f4f4f] font-semibold">
                      Confirm Password
                    </p>
                    <div className="flex items-center justify-between rounded-lg border border-gray-500 pr-[20px]">
                      <input
                        onChange={(e) => setconfirmPassword(e.target.value)}
                        className="w-full pl-[20px] py-3 flex-1 outline-none rounded-lg border-none text-[16px]"
                        type="password"
                        placeholder="Enter your Password"
                        required
                      />
                      <Image
                        src={eyeIcon}
                        alt=""
                        className="h-6 w-6 cursor-pointer"
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" name="" id="" />
                    <p className="text-[16px] text-[#4f4f4f]">Remember me</p>
                  </div>
                  <p className="text-blue-700 text-[16px] font-semibold ml-2 cursor-pointer">
                    Forget Password?
                  </p>
                </div>
              </div>
              {signUp ? (
                <button
                  onClick={() => signUpWithCred(email, password, name)}
                  className="bg-[#1f3e57] w-full px-1 py-[15px] rounded-lg text-white font-semibold active:bg-[#1f3e57]"
                >
                  Sign Up
                </button>
              ) : (
                <button
                  onClick={() => signInWithCred(email, password)}
                  className="bg-[#1f3e57] w-full px-1 py-[15px] rounded-lg text-white font-semibold active:bg-[#1f3e57]"
                >
                  Login
                </button>
              )}
            </div>
            <div className="flex flex-col justify-center items-center py-10 space-y-2">
              <p className="text-[16px] text-[#4f4f4f]">
                Or, Continue with{" "}
              </p>
              <div className="space-x-3 flex items-center justify-center">
                <Image
                  src={google}
                  onClick={signUpWithGoogle}
                  className="cursor-pointer w-[40px] h-[40px] rounded-full"
                />
                <Image
                  src={fb}
                  alt="fb"
                  className="cursor-pointer w-[40px] h-[40px] rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
