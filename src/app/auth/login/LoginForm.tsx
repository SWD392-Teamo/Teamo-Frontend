"use client";

import Input from "@/components/Input";
import { useLoading } from "@/providers/LoadingProvider";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "flowbite-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillGoogleCircle } from "react-icons/ai";
import { firebaseAuth } from "../../../../firebase";

export default function LoginForm() {
  // Next navigation
  const router = useRouter();

  const {showLoading, hideLoading} = useLoading();

  // Set up form state
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onTouched",
  });

  // Google login
  async function handleGoogleLogin() {
    try {
      // Trigger Google sign-in popup
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);

      // Get ID token
      const idToken = await result.user.getIdToken();

      showLoading();
      const res = await signIn("google", {
        idToken,
        redirect: false,
      });
      hideLoading();

      if (res?.code == 'credentials') {
        toast.error("Please use the provided email from FPT education");
        return;
      }
      else if (res?.code == null){
        window.location.href = '/';
      }
      else {
        throw res?.code;
      }
    } catch (error: any) {
      toast.error("Unexpected error while logging in: " + error);
    }
  }

  // On submit login logic
  async function onSubmit(data: FieldValues) {
    try {
      showLoading();
      const res = await signIn("dotnet-identity", {
        ...data,
        redirect: false
      });
      hideLoading();

      if (res?.code == 'credentials') {
        toast.error("Incorrect email or password");
        return;
      }
      else if (res?.code == null){
        window.location.href = '/';
      }
      else {
        throw res?.code;
      }
    } catch (error: any) {
      toast.error("Unexpected error while logging in: " + error);
    }
  }

  return (
    <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Input
          label="Email"
          name="email"
          control={control}
          type="email"
          showlabel="true"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Invalid email address",
            },
          }}
        />
      </div>

      <div className="mb-6">
        <Input
          label="Password"
          name="password"
          control={control}
          type="password"
          showlabel="true"
          rules={{ required: "Password is required" }}
        />
      </div>

      <div className="flex flex-col gap-6">
        <Button
          className="w-full rounded-full  bg-gradient-to-r from-[#46afe9] to-[#c5e9f9] text-black py-2 text-xl font-bold flex justify-center items-center transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          isProcessing={isSubmitting}
          disabled={!isValid}
          type="submit"
          size=""
        >
          Submit
        </Button>
        <Button
          className="w-full rounded-full  bg-gradient-to-r from-[#46afe9] to-[#c5e9f9] text-black py-2 text-xl font-bold flex justify-center items-center transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          onClick={handleGoogleLogin}
          size=""
        >
          <div className="btn--icon">
            <div>Login with</div>
            <AiFillGoogleCircle size={20} />
          </div>
        </Button>
      </div>
    </form>
  );
}
