"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";

type SignUpData = { fullname: string; email: string; password: string };

export default function SimpleSignUp() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpData>();
    const router = useRouter()

    useGSAP(() => {
        // A simple, clean staggered fade-up animation
        gsap.from(".animate-item", {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
        });
    }, { scope: containerRef });

    const onSubmit = async (data: SignUpData) =>{
        try {
            const fullname = data.fullname;
            const email = data.email;
            const password = data.password;
            // if (!fullname || !email || password){
            //     toast.error("All fields are required")
            //     return
            // }
            const result = await axiosInstance.post("/api/signup" , {fullname , email , password})
            console.log(result)
            toast.success("Verify Your Account")
            router.push("/login")
        } catch (error) {
            
        }
    };

    return (
        <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-zinc-950 text-white p-4 font-sans">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
                <div className="animate-item mb-8 text-center">
                    <h1 className="text-3xl font-semibold mb-2">Create Account</h1>
                    <p className="text-zinc-400 text-sm">Join us to get started.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="animate-item">
                        <label className="block text-sm text-zinc-400 mb-1">Full Name</label>
                        <input
                            {...register("fullname", { required: true })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="John Doe"
                        />
                        {errors.fullname && <span className="text-red-400 text-xs mt-1 block">Name is required</span>}
                    </div>

                    <div className="animate-item">
                        <label className="block text-sm text-zinc-400 mb-1">Email Address</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="you@example.com"
                        />
                        {errors.email && <span className="text-red-400 text-xs mt-1 block">Email is required</span>}
                    </div>

                    <div className="animate-item">
                        <label className="block text-sm text-zinc-400 mb-1">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: true })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="••••••••"
                        />
                        {errors.password && <span className="text-red-400 text-xs mt-1 block">Password is required</span>}
                    </div>

                    <button type="submit" className="animate-item w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors mt-4">
                        Sign Up
                    </button>
                </form>

                <p className="animate-item text-center text-zinc-500 text-sm mt-6">
                    Already have an account? <a href="#" className="text-blue-400 hover:text-blue-300">Log in</a>
                </p>
            </div>
        </div>
    );
}