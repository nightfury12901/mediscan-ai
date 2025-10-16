'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Upload, Sparkles, ArrowLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { NetworkBackground } from '@/components/ui/NetworkBackground'
import { analyzeSkinImage, type AnalysisResult } from '@/lib/api'

export default function AnalyzePage() {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      setResult(null)
      setError(null)
    }
  }

  const handleAnalyze = async () => {
    if (!imageFile) return

    setAnalyzing(true)
    setError(null)

    try {
      const analysisResult = await analyzeSkinImage(imageFile)
      setResult(analysisResult)

      // Save the diagnosis to backend for this patient
      const patientId = localStorage.getItem('userPatientId')
      console.log('Patient ID from localStorage:', patientId)
      console.log('Analysis result:', analysisResult)

      if (patientId && analysisResult.prediction) {
        console.log('Saving diagnosis for patient:', patientId)
        
        const diagnosisResponse = await fetch('http://localhost:8080/api/diagnoses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            patientId: parseInt(patientId, 10),
            diseasePrediction: analysisResult.prediction,
            confidenceScore: analysisResult.confidence / 100, // Convert percentage to decimal (91 -> 0.91)
            imagePath: null
          })
        })

        const diagnosisData = await diagnosisResponse.json()
        console.log('Diagnosis save response:', diagnosisData)

        if (!diagnosisData.success) {
          console.error('Failed to save diagnosis:', diagnosisData.error)
        } else {
          console.log('Diagnosis saved successfully!')
        }
      } else {
        console.warn('No patient ID found or no prediction result')
      }
    } catch (err) {
      setError('Analysis failed. Please make sure the backend server is running.')
      console.error('Analysis error:', err)
    } finally {
      setAnalyzing(false)
    }
  }

  const resetAnalysis = () => {
    setSelectedImage(null)
    setImageFile(null)
    setResult(null)
    setError(null)
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950 transition-colors overflow-hidden">
      <NetworkBackground />
      <div className="relative z-10 min-h-screen p-8">
        {/* Back Button */}
        <motion.button
          onClick={() => router.push('/')}
          className="mb-8 flex items-center gap-2 text-slate-700 dark:text-white hover:text-cyan-500 dark:hover:text-cyan-400 transition"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
            🔬 AI Analysis Studio
          </h1>
          <p className="text-xl text-slate-600 dark:text-gray-400">
            Upload your skin image for instant AI-powered diagnosis
          </p>
        </motion.div>

        {/* Upload Section */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl p-8 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-slate-300/20 dark:border-white/20"
          >
            {!selectedImage ? (
              <label className="block cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center py-20 border-4 border-dashed border-slate-400 dark:border-gray-600 rounded-2xl hover:border-cyan-500 dark:hover:border-cyan-400 transition">
                  <Upload className="w-20 h-20 text-slate-600 dark:text-gray-400 mb-4" />
                  <p className="text-2xl font-semibold text-slate-800 dark:text-white mb-2">
                    Click to Upload Image
                  </p>
                  <p className="text-slate-600 dark:text-gray-400">
                    or drag and drop
                  </p>
                </div>
              </label>
            ) : (
              <div className="space-y-6">
                {/* Image Preview */}
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-full h-96 object-cover"
                  />
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-500 rounded-xl"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <p className="text-red-300">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Results */}
                <AnimatePresence>
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500 rounded-2xl">
                        <div className="flex items-center gap-3 mb-4">
                          <CheckCircle className="w-6 h-6 text-green-400" />
                          <h3 className="text-2xl font-bold text-white">Analysis Complete!</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="p-4 bg-black/20 rounded-xl">
                            <p className="text-gray-400 text-sm mb-1">Detected Condition</p>
                            <p className="text-2xl font-bold text-cyan-400">{result.prediction}</p>
                          </div>
                          <div className="p-4 bg-black/20 rounded-xl">
                            <p className="text-gray-400 text-sm mb-1">Confidence Level</p>
                            <p className="text-2xl font-bold text-green-400">{result.confidence}%</p>
                          </div>
                        </div>

                        <details className="cursor-pointer">
                          <summary className="text-cyan-400 hover:text-cyan-300 transition">
                            View Detailed Analysis
                          </summary>
                          <pre className="mt-4 p-4 bg-black/40 rounded-xl text-sm text-gray-300 overflow-auto max-h-60">
                            {result.rawResult}
                          </pre>
                        </details>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={resetAnalysis}
                    className="flex-1 py-4 bg-slate-300 dark:bg-gray-700 text-slate-900 dark:text-white rounded-xl font-semibold hover:bg-slate-400 dark:hover:bg-gray-600 transition"
                  >
                    Choose Different Image
                  </button>
                  {!result && (
                    <button
                      onClick={handleAnalyze}
                      disabled={analyzing}
                      className="flex-1 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {analyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Analyze with AI
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: '🔒', title: 'Secure', desc: 'Your data is encrypted' },
              { icon: '⚡', title: 'Fast', desc: 'Results in seconds' },
              { icon: '🎯', title: 'Accurate', desc: '96% accuracy rate' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="glass rounded-2xl p-6 text-center bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-slate-300/20 dark:border-white/20"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
