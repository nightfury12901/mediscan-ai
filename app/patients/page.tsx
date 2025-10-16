'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowLeft, User, Calendar, Phone, Mail, Activity, Search } from 'lucide-react'
import { NetworkBackground } from '@/components/ui/NetworkBackground'
import { getAllPatients } from '@/lib/api'

interface Diagnosis {
  diagnosisId: number
  diseasePrediction: string
  confidenceScore: number
  analysisDate?: string
}

interface Patient {
  patientId: number
  name: string
  age: number
  phone: string
  email: string
  latestDiagnosis?: Diagnosis
}

export default function PatientsPage() {
  const router = useRouter()
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = async () => {
    try {
      const data = await getAllPatients()
      setPatients(data.patients || [])
      setLoading(false)
    } catch (err) {
      setError('Failed to load patients. Make sure backend is running.')
      setLoading(false)
    }
  }

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      <NetworkBackground />
      <div className="relative z-10 min-h-screen p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <motion.button
            onClick={() => router.push('/')}
            className="mb-6 flex items-center gap-2 text-white hover:text-cyan-400 transition"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </motion.button>

          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl font-bold text-white mb-2">
                📋 Patient Records
              </h1>
              <p className="text-xl text-gray-400">
                View and manage patient diagnoses
              </p>
            </motion.div>

            <motion.button
              onClick={() => router.push('/analyze')}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              + New Analysis
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search patients by name or email..."
              className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto mb-8 grid md:grid-cols-3 gap-6">
          {[
            { label: 'Total Patients', value: patients.length, icon: User, color: 'from-cyan-400 to-blue-500' },
            { label: 'With Diagnosis', value: patients.filter(p => p.latestDiagnosis).length, icon: Activity, color: 'from-purple-400 to-pink-500' },
            { label: 'Today', value: new Date().toLocaleDateString(), icon: Calendar, color: 'from-green-400 to-emerald-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/20"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Patient List */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="glass rounded-2xl p-12 bg-white/5 backdrop-blur-xl border border-white/20 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-400 border-t-transparent"></div>
              <p className="mt-4 text-gray-400">Loading patients...</p>
            </div>
          ) : error ? (
            <div className="glass rounded-2xl p-12 bg-red-500/10 backdrop-blur-xl border border-red-500/50 text-center">
              <p className="text-red-400">{error}</p>
              <button
                onClick={loadPatients}
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Retry
              </button>
            </div>
          ) : filteredPatients.length === 0 ? (
            <div className="glass rounded-2xl p-12 bg-white/5 backdrop-blur-xl border border-white/20 text-center">
              <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-xl text-gray-400">No patients found</p>
              <button
                onClick={() => router.push('/analyze')}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition"
              >
                Add First Patient
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredPatients.map((patient, index) => (
                <motion.div
                  key={patient.patientId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/20 hover:border-cyan-500/50 transition cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                        {patient.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">{patient.name}</h3>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-400">
                            <User className="w-4 h-4" />
                            Age: {patient.age}
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Phone className="w-4 h-4" />
                            {patient.phone}
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Mail className="w-4 h-4" />
                            {patient.email}
                          </div>
                        </div>
                        {/* Diagnosis Info */}
                        <div className="mt-4 p-4 bg-black/20 rounded-xl">
                          <p className="text-sm text-gray-500 mb-2">Latest Diagnosis:</p>
                          {patient.latestDiagnosis ? (
                            <div className="space-y-1">
                              <span className="text-cyan-400 font-semibold">{patient.latestDiagnosis.diseasePrediction}</span>
                              <span className="text-green-400 ml-2 font-semibold">{Math.round(patient.latestDiagnosis.confidenceScore * 100)}%</span>
                              <span className="text-gray-500 block text-xs">{new Date(patient.latestDiagnosis.analysisDate || '').toLocaleString()}</span>
                            </div>
                          ) : (
                            <p className="text-cyan-400 font-semibold">
                              No diagnosis yet - Click "Analyze" to start
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push('/analyze')}
                        className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition text-sm font-semibold"
                      >
                        Analyze
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
