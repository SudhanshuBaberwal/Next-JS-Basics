"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function SimpleVerify() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [code, setCode] = useState("");

    useGSAP(() => {
        gsap.from(".animate-item", {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
        });
    }, { scope: containerRef });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Verifying Code:", code);
    };

    return (
        <div ref={containerRef} className="min-h-screen flex items-center justify-center bg-zinc-950 text-white p-4 font-sans">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl text-center">
                <div className="animate-item mb-6">
                    <div className="w-12 h-12 bg-blue-500/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-semibold mb-2">Check your email</h1>
                    <p className="text-zinc-400 text-sm">
                        We sent a verification code to your email.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="animate-item">
                        <input
                            type="text"
                            maxLength={6}
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} // Only allows numbers
                            className="w-full text-center tracking-[1em] text-2xl font-mono bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="000000"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={code.length !== 6}
                        className="animate-item w-full bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-medium py-3 rounded-lg transition-colors"
                    >
                        Verify Email
                    </button>
                </form>

                <p className="animate-item text-center text-zinc-500 text-sm mt-6">
                    Didn't receive the email? <button className="text-blue-400 hover:text-blue-300">Click to resend</button>
                </p>
            </div>
        </div>
    );
}