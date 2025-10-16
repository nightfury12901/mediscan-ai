'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Activity, Sparkles, Users, ArrowRight, LogIn, FolderHeart } from 'lucide-react'
import { NetworkBackground } from '@/components/ui/NetworkBackground'
import { DiseaseCards } from '@/components/ui/DiseaseCards'
import HeartParticles from '@/components/ui/HeartParticles'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="relative overflow-hidden bg-slate-950">

      {/* ========== HERO SECTION ========== */}
      <div className="relative min-h-screen">

        {/* CSS Aurora Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-950" />
          {/* Animated Aurora Blobs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Network Constellation */}
        <NetworkBackground />
        {/* Interactive Heart Particles */}
        <HeartParticles />
        {/* Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.7)_70%)]" />

        {/* Top Navigation Bar */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20 flex items-center justify-between px-8 py-6"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">MediScan</span>
          </div>
          {/* Nav Buttons */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => router.push('/patients')}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-xl border border-white/20 text-white rounded-xl hover:bg-white/10 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FolderHeart className="w-4 h-4" />
              Patients
            </motion.button>
            <motion.button
              onClick={() => router.push('/login')}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-600 hover:to-blue-700 transition font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogIn className="w-4 h-4" />
              Login
            </motion.button>
          </div>
        </motion.nav>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-0">

          {/* Live Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm text-gray-300">AI Diagnostics Online</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10 }}
            >
              <motion.span 
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                AI-Powered Skin
              </motion.span>
              <br />
              <span className="text-white drop-shadow-2xl">Disease Detection</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <p className="text-xl md:text-2xl text-gray-400">
                Revolutionary dermatology diagnostics using cutting-edge
              </p>
              <p className="text-xl md:text-2xl text-gray-400">
                machine learning and <span className="text-cyan-400 font-semibold">Google Vertex AI</span>
              </p>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            {/* Primary CTA */}
            <motion.button
              onClick={() => router.push('/login')}
              className="group relative px-12 py-6 text-xl font-bold rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600" />
              <span className="relative z-10 flex items-center gap-3 text-white">
                <Sparkles className="w-6 h-6" />
                Get Started
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
            </motion.button>
            {/* Secondary CTA */}
            <motion.button
              onClick={() => router.push('/patients')}
              className="group relative px-12 py-6 text-xl font-bold rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20" />
              <span className="relative z-10 flex items-center gap-3 text-white">
                <FolderHeart className="w-6 h-6" />
                View Patients
              </span>
            </motion.button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            className="flex flex-wrap gap-6 justify-center max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { icon: Activity, label: "Accuracy", value: "96%", color: "from-green-400 to-emerald-500" },
              { icon: Sparkles, label: "Diseases", value: "8+", color: "from-cyan-400 to-blue-500" },
              { icon: Users, label: "Patients", value: "10K+", color: "from-purple-400 to-pink-500" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="relative rounded-2xl p-8 min-w-[180px] bg-white/5 backdrop-blur-xl border border-white/10">
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity`}
                  />
                  <stat.icon className="w-10 h-10 mx-auto mb-3 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  <div className="text-4xl font-bold text-white text-center mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400 text-center uppercase tracking-wider">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ========== DISEASE CARDS SECTION ========== */}
      <div className="relative z-10">
        <DiseaseCards />
      </div>

      {/* ========== FOOTER CTA SECTION ========== */}
      <div className="relative z-10 py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Upload your skin image and get instant AI-powered analysis with 96% accuracy
            </p>
            <motion.button
              onClick={() => router.push('/login')}
              className="group relative px-12 py-6 text-xl font-bold rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600" />
              <span className="relative z-10 flex items-center gap-3 text-white">
                <Sparkles className="w-6 h-6" />
                Try It Now - Free
                <ArrowRight className="w-5 h-5" />
              </span>
            </motion.button>
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
              <div className="text-center"><div className="text-3xl font-bold text-cyan-400 mb-1">96%</div><div className="text-sm text-gray-500">Accuracy</div></div>
              <div className="text-center"><div className="text-3xl font-bold text-green-400 mb-1">10K+</div><div className="text-sm text-gray-500">Analyses</div></div>
              <div className="text-center"><div className="text-3xl font-bold text-purple-400 mb-1">&lt;3s</div><div className="text-sm text-gray-500">Response Time</div></div>
              <div className="text-center"><div className="text-3xl font-bold text-blue-400 mb-1">24/7</div><div className="text-sm text-gray-500">Available</div></div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* ========== FOOTER ========== */}
      <footer className="relative z-10 border-t border-white/10 py-8 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-white font-semibold text-lg">MediScan AI</span>
          </div>
          <div className="text-sm text-gray-500">
            © 2025 MediScan. Powered by Google Vertex AI.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => router.push('/analyze')} className="text-sm text-gray-400 hover:text-white transition">
              Analyze
            </button>
            <button onClick={() => router.push('/patients')} className="text-sm text-gray-400 hover:text-white transition">
              Patients
            </button>
            <button onClick={() => router.push('/login')} className="text-sm text-gray-400 hover:text-white transition">
              Login
            </button>
          </div>
        </div>
      </footer>

    </div>
  )
}
