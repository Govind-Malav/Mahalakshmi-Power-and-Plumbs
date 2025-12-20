import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const WelcomePage = () => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-900 flex items-center justify-center">

            {/* BACKGROUND ANIMATIONS */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Animated Gradient Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse" style={{ animationDelay: "2s" }}></div>

                {/* Floating 3D Elements */}
                <div className="absolute top-[20%] right-[15%] animate-float-3d opacity-20 hidden lg:block">
                    <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl transform rotate-12 shadow-2xl border border-white/10 backdrop-blur-sm"></div>
                </div>
                <div className="absolute bottom-[20%] left-[15%] animate-float-3d opacity-20 hidden lg:block" style={{ animationDelay: "1s" }}>
                    <div className="w-24 h-24 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full shadow-2xl border border-white/10 backdrop-blur-sm"></div>
                </div>
            </div>

            {/* GLASS CONTAINER */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16 max-w-4xl w-full mx-4 shadow-2xl text-center"
            >
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-6 tracking-tight">
                        Mahalakshmi
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
                        Your gateway to premium electrical & sanitary essentials. <br />
                        <span className="text-yellow-400 font-medium">Join us to start building.</span>
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                    {/* LOGIN CARD */}
                    <Link to="/login" className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                        <div className="relative h-full bg-slate-800/50 hover:bg-slate-800/80 border border-white/10 rounded-2xl p-8 transition-all duration-300 transform group-hover:-translate-y-2 flex flex-col items-center justify-center gap-4">
                            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                                🔑
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">Sign In</h3>
                                <p className="text-slate-400 text-sm">Access your account</p>
                            </div>
                        </div>
                    </Link>

                    {/* SIGNUP CARD */}
                    <Link to="/register" className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                        <div className="relative h-full bg-slate-800/50 hover:bg-slate-800/80 border border-white/10 rounded-2xl p-8 transition-all duration-300 transform group-hover:-translate-y-2 flex flex-col items-center justify-center gap-4">
                            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                                ✨
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">Join Now</h3>
                                <p className="text-slate-400 text-sm">Create a new account</p>
                            </div>
                        </div>
                    </Link>
                </div>



            </motion.div>
        </div>
    );
};

export default WelcomePage;
