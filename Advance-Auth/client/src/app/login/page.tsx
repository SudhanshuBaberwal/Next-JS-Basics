"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useForm } from "react-hook-form";

type LoginData = { email: string; password: string };

export default function SimpleLogin() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();

    useGSAP(() => {
        gsap.from(".animate-item", {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
        });
    }, { scope: containerRef });

    const onSubmit = (data: LoginData) => console.log("Login:", data);

    return (
        <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-zinc-950 text-white p-4 font-sans">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
                <div className="animate-item mb-8 text-center">
                    <h1 className="text-3xl font-semibold mb-2">Welcome Back</h1>
                    <p className="text-zinc-400 text-sm">Please enter your details to sign in.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

                    <div className="animate-item relative">
                        <label className="block text-sm text-zinc-400 mb-1">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: true })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="••••••••"
                        />
                        {errors.password && <span className="text-red-400 text-xs mt-1 block">Password is required</span>}
                        <a href="#" className="absolute right-0 -bottom-6 text-xs text-zinc-500 hover:text-blue-400">Forgot password?</a>
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="animate-item w-full bg-white hover:bg-zinc-200 text-zinc-900 font-medium py-3 rounded-lg transition-colors mt-4">
                            Sign In
                        </button>
                    </div>
                </form>

                <p className="animate-item text-center text-zinc-500 text-sm mt-8">
                    Don't have an account? <a href="#" className="text-blue-400 hover:text-blue-300">Sign up</a>
                </p>
            </div>
        </div>
    );
}