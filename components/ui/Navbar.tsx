'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-full px-6 py-3">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <motion.span
            className="text-3xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🏥
          </motion.span>
          <span className="text-xl font-bold text-white">MediScan</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-white hover:text-cyan-400 transition">
            Home
          </Link>
          <Link href="/analyze" className="text-white hover:text-cyan-400 transition">
            Analyze
          </Link>
          <Link href="/history" className="text-white hover:text-cyan-400 transition">
            History
          </Link>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-semibold"
        >
          Get Started
        </motion.button>
      </div>
    </motion.nav>
  )
}
