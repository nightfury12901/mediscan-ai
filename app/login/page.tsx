'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Lock, Mail, Sparkles, ArrowRight, User, Phone, Calendar } from 'lucide-react'
import { NetworkBackground } from '@/components/ui/NetworkBackground'

export default function LoginPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (name && age && phone && email) {
      try {
        const res = await fetch('http://localhost:8080/api/patients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name, 
            age: parseInt(age, 10), 
            phone, 
            email 
          })
        })
        const data = await res.json()
        if (data.success) {
          localStorage.setItem('userPatientId', data.patientId)
          localStorage.setItem('userName', name)
          localStorage.setItem('userAge', age)
          localStorage.setItem('userPhone', phone)
          localStorage.setItem('userEmail', email)
          router.push('/analyze')
        } else {
          setError('Could not register patient: ' + data.error)
        }
      } catch (err) {
        setError('Network error. Backend not reachable.')
      } finally {
        setLoading(false)
      }
    } else {
      setError('Please fill all fields')
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden flex items-center justify-center">
      <NetworkBackground />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md p-8"
      >
        <div className="glass rounded-3xl p-8 bg-white/5 backdrop-blur-xl border border-white/20">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white text-center mb-2">Welcome!</h1>
          <p className="text-gray-400 text-center mb-8">
            Enter your information to start diagnosis
          </p>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  value={name} 
                  onChange={e=>setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                  placeholder="Your Name" 
                  required 
                />
              </div>
            </div>
            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="number" 
                  value={age} 
                  onChange={e=>setAge(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                  placeholder="Your Age" 
                  min="1"
                  max="120"
                  required 
                />
              </div>
            </div>
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  value={phone} 
                  onChange={e=>setPhone(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                  placeholder="Phone Number" 
                  required 
                />
              </div>
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  value={email} 
                  onChange={e=>setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                  placeholder="you@example.com" 
                  required 
                />
              </div>
            </div>
            {/* Error */}
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm text-center">{error}</motion.p>
            )}
            {/* Submit */}
            <motion.button 
              type="submit" 
              disabled={loading}
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? "Signing in..." : <>Continue <ArrowRight className="w-5 h-5" /></>}
            </motion.button>
          </form>
          <div className="mt-6 flex justify-between text-sm">
            <button onClick={() => router.push('/')} className="text-gray-400 hover:text-white transition">← Back to Home</button>
            <button onClick={() => router.push('/patients')} className="text-cyan-400 hover:text-cyan-300 transition">View Patients →</button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
