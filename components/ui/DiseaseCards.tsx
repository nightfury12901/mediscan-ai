'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, AlertCircle, Info, TrendingUp } from 'lucide-react'

interface Disease {
  id: string
  name: string
  imagePath: string // Changed from icon to imagePath
  color: string
  gradient: string
  count: number
  description: string
  symptoms: string[]
  causes: string[]
  treatment: string[]
  prevention: string[]
  severity: 'Low' | 'Medium' | 'High'
  prevalence: string
}

const diseases: Disease[] = [
  {
    id: 'acne',
    name: 'Acne',
    imagePath: '/images/diseases/acne.png',
    color: '#ef4444',
    gradient: 'from-red-500 via-pink-500 to-rose-600',
    count: 457,
    severity: 'Low',
    prevalence: 'Very Common',
    description: 'Common inflammatory skin condition causing pimples, blackheads, and cysts, primarily affecting teenagers but can occur at any age.',
    symptoms: ['Blackheads and whiteheads', 'Pimples and pustules', 'Cysts and nodules', 'Red inflamed skin', 'Scarring in severe cases'],
    causes: ['Excess sebum production', 'Clogged hair follicles', 'Bacterial infection (P. acnes)', 'Hormonal changes', 'Stress and diet factors'],
    treatment: ['Benzoyl peroxide topical', 'Salicylic acid cleansers', 'Retinoid creams', 'Oral antibiotics for severe cases', 'Isotretinoin for cystic acne'],
    prevention: ['Regular gentle cleansing', 'Avoid touching face', 'Non-comedogenic products', 'Manage stress levels', 'Balanced diet']
  },
  {
    id: 'actinic',
    name: 'Actinic Keratosis',
    imagePath: '/images/diseases/actinic-keratosis.png',
    color: '#f59e0b',
    gradient: 'from-amber-500 via-orange-500 to-yellow-600',
    count: 441,
    severity: 'Medium',
    prevalence: 'Common in 40+',
    description: 'Precancerous rough, scaly patches caused by years of sun damage. Can develop into squamous cell carcinoma if untreated.',
    symptoms: ['Rough, scaly patches', 'Dry or crusty texture', 'Pink, red, or brown color', 'Flat or slightly raised', 'Itching or burning sensation'],
    causes: ['Prolonged UV exposure', 'Cumulative sun damage', 'Tanning beds usage', 'Fair skin complexion', 'Age over 40 years'],
    treatment: ['Cryotherapy (freezing)', 'Topical 5-fluorouracil', 'Photodynamic therapy', 'Chemical peels', 'Surgical removal if needed'],
    prevention: ['Daily broad-spectrum SPF 30+', 'Protective clothing', 'Avoid midday sun', 'Regular skin checks', 'No tanning beds']
  },
  {
    id: 'atopic',
    name: 'Atopic Dermatitis',
    imagePath: '/images/diseases/atopic-dermatitis.png',
    color: '#ec4899',
    gradient: 'from-pink-500 via-rose-500 to-fuchsia-600',
    count: 289,
    severity: 'Medium',
    prevalence: 'Common in Children',
    description: 'Chronic inflammatory condition causing dry, itchy, and inflamed skin. Often begins in childhood and may improve with age.',
    symptoms: ['Intensely itchy skin', 'Red to brownish patches', 'Dry, cracked skin', 'Small raised bumps', 'Thickened skin from scratching'],
    causes: ['Genetic predisposition', 'Immune system dysfunction', 'Environmental triggers', 'Allergens (dust, pollen)', 'Skin barrier defects'],
    treatment: ['Emollient moisturizers', 'Topical corticosteroids', 'Calcineurin inhibitors', 'Antihistamines for itching', 'Phototherapy for severe cases'],
    prevention: ['Moisturize 2-3 times daily', 'Identify and avoid triggers', 'Use fragrance-free products', 'Take lukewarm baths', 'Wear soft cotton clothing']
  },
  {
    id: 'bullous',
    name: 'Bullous Pemphigoid',
    imagePath: '/images/diseases/bullous-pemphigoid.png',
    color: '#3b82f6',
    gradient: 'from-blue-500 via-cyan-500 to-sky-600',
    count: 260,
    severity: 'High',
    prevalence: 'Rare',
    description: 'Rare autoimmune disorder causing large, fluid-filled blisters. Most common in elderly patients over 60 years old.',
    symptoms: ['Large tense blisters', 'Severe itching before blisters', 'Red inflamed skin', 'Blisters that rupture', 'Potential scarring'],
    causes: ['Autoimmune reaction', 'Certain medications trigger', 'UV light exposure', 'Radiation therapy', 'Unknown factors'],
    treatment: ['High-dose corticosteroids', 'Immunosuppressants', 'Doxycycline antibiotics', 'Wound care for blisters', 'Rituximab for severe cases'],
    prevention: ['No proven prevention', 'Avoid known triggers', 'Early medical intervention', 'Monitor medications', 'Regular dermatology visits']
  },
  {
    id: 'eczema',
    name: 'Eczema',
    imagePath: '/images/diseases/eczema.png',
    color: '#f97316',
    gradient: 'from-orange-500 via-red-500 to-amber-600',
    count: 801,
    severity: 'Medium',
    prevalence: 'Very Common',
    description: 'Inflammatory condition causing red, itchy, and dry patches. Can be triggered by irritants, allergens, or stress.',
    symptoms: ['Dry, sensitive skin', 'Intense itching (worse at night)', 'Red or brownish patches', 'Small raised bumps', 'Crusty oozing after scratching'],
    causes: ['Genetic factors', 'Environmental irritants', 'Allergens (soap, detergent)', 'Stress and anxiety', 'Climate changes'],
    treatment: ['Regular moisturizing', 'Topical corticosteroids', 'Antihistamines', 'Cool compresses', 'Avoid triggers'],
    prevention: ['Daily moisturizer use', 'Identify triggers', 'Mild soap products', 'Keep nails short', 'Stress management']
  },
  {
    id: 'melanoma',
    name: 'Melanoma',
    imagePath: '/images/diseases/melanoma.png',
    color: '#1f2937',
    gradient: 'from-gray-800 via-slate-700 to-gray-900',
    count: 297,
    severity: 'High',
    prevalence: 'Uncommon but Serious',
    description: 'Most dangerous skin cancer developing from melanocytes. Early detection is critical for successful treatment.',
    symptoms: ['New unusual moles', 'Changing existing moles', 'Asymmetric borders', 'Multiple colors in one mole', 'Diameter larger than 6mm'],
    causes: ['UV radiation exposure', 'Genetic predisposition', 'Fair skin and many moles', 'Family history', 'Weakened immune system'],
    treatment: ['Surgical excision', 'Immunotherapy', 'Targeted therapy (BRAF inhibitors)', 'Radiation therapy', 'Chemotherapy if metastatic'],
    prevention: ['SPF 50+ sunscreen daily', 'Monthly self-exams', 'Annual dermatology screening', 'Avoid tanning beds', 'Protective clothing']
  },
  {
    id: 'normal',
    name: 'Normal Skin',
    imagePath: '/images/diseases/normal-skin.png',
    color: '#10b981',
    gradient: 'from-green-500 via-emerald-500 to-teal-600',
    count: 372,
    severity: 'Low',
    prevalence: 'Baseline',
    description: 'Healthy skin with balanced moisture, good elasticity, and no visible conditions. Represents optimal skin health.',
    symptoms: ['Even skin tone', 'Smooth texture', 'Good elasticity', 'No visible irritation', 'Balanced oil production'],
    causes: ['Proper skincare routine', 'Healthy diet', 'Adequate hydration', 'Sun protection', 'Genetic factors'],
    treatment: ['Maintain current routine', 'Gentle cleanser daily', 'Regular moisturizing', 'SPF protection', 'Healthy lifestyle'],
    prevention: ['Continue good habits', 'Annual skin checks', 'Stay hydrated', 'Balanced nutrition', 'Avoid smoking']
  },
  {
    id: 'psoriasis',
    name: 'Psoriasis',
    imagePath: '/images/diseases/psoriasis.png',
    color: '#8b5cf6',
    gradient: 'from-purple-500 via-violet-500 to-indigo-600',
    count: 360,
    severity: 'Medium',
    prevalence: 'Common',
    description: 'Autoimmune condition causing rapid skin cell buildup, forming thick silvery scales and itchy, painful red patches.',
    symptoms: ['Red patches with scales', 'Dry cracked skin that bleeds', 'Itching and burning', 'Thickened nails', 'Swollen stiff joints'],
    causes: ['Immune system malfunction', 'Genetic predisposition', 'Stress triggers', 'Infections', 'Cold dry weather'],
    treatment: ['Topical corticosteroids', 'Vitamin D analogues', 'Phototherapy (UV light)', 'Methotrexate', 'Biologic drugs'],
    prevention: ['Moisturize regularly', 'Avoid triggers', 'Manage stress', 'Limit alcohol', 'Quit smoking']
  },
]

export function DiseaseCards() {
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="relative py-24 px-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200 }}
          className="inline-block mb-4"
        >
          <div className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Powered by Vertex AI</span>
          </div>
        </motion.div>

        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="text-white">Detectable Conditions</span>
          
          
        </h2>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">
          Our AI model can accurately identify and analyze these 8 dermatological conditions with{' '}
          <span className="text-cyan-400 font-semibold">96% diagnostic accuracy</span>
        </p>
      </motion.div>

      {/* Disease Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {diseases.map((disease, index) => (
          <motion.div
            key={disease.id}
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              y: -12,
              rotateY: hoveredCard === disease.id ? 5 : 0,
              scale: 1.02
            }}
            onHoverStart={() => setHoveredCard(disease.id)}
            onHoverEnd={() => setHoveredCard(null)}
            onClick={() => setSelectedDisease(disease)}
            className="group relative cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative rounded-3xl p-6 h-full bg-slate-900/40 backdrop-blur-xl border border-white/10 overflow-hidden">
              
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${disease.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
                animate={{
                  scale: hoveredCard === disease.id ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
                  style={{ transform: 'translateZ(20px)' }}
                />
              </div>

              <AnimatePresence>
                {hoveredCard === disease.id && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                          background: disease.color,
                          left: `${10 + i * 10}%`,
                          top: `${20 + (i % 3) * 25}%`,
                        }}
                        initial={{ opacity: 0, y: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          y: [-20, -60],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>

              <div className="relative z-10">
                {/* Image instead of Emoji */}
                <div className="mb-4 relative w-20 h-20 rounded-xl bg-slate-800/50 border border-slate-700/50 group-hover:border-slate-600 overflow-hidden">
                  <img 
                    src={disease.imagePath}
                    alt={disease.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback gradient if image not found
                      const target = e.currentTarget
                      target.style.display = 'none'
                      if (target.parentElement) {
                        target.parentElement.style.background = `linear-gradient(135deg, ${disease.color}30, ${disease.color}60)`
                      }
                    }}
                  />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  {disease.name}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Samples:</span>
                    <span className="text-lg font-bold text-cyan-400">{disease.count}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    disease.severity === 'High' 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/50' 
                      : disease.severity === 'Medium' 
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' 
                      : 'bg-green-500/20 text-green-400 border border-green-500/50'
                  }`}>
                    <AlertCircle className="w-3 h-3" />
                    {disease.severity}
                  </div>
                  
                  <div className="text-xs text-gray-500 px-2 py-1 rounded bg-white/5">
                    {disease.prevalence}
                  </div>
                </div>

                <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                  {disease.description}
                </p>

                <motion.div
                  className="flex items-center gap-2 text-cyan-400 text-sm font-semibold group-hover:gap-3 transition-all"
                  whileHover={{ x: 5 }}
                >
                  <Info className="w-4 h-4" />
                  Learn More
                  <motion.span
                    animate={{ x: hoveredCard === disease.id ? [0, 5, 0] : 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal stays the same - just replace emoji with image in header */}
      <AnimatePresence>
        {selectedDisease && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDisease(null)}
          >
            <motion.div
              className="relative bg-slate-900 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-white/20"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => setSelectedDisease(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 transition border border-white/10"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>

              <div className="flex items-start gap-6 mb-8">
                {/* Image in Modal */}
                <div className="w-24 h-24 rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden flex-shrink-0">
                  <img 
                    src={selectedDisease.imagePath}
                    alt={selectedDisease.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h2 className="text-5xl font-bold text-white mb-4">
                    {selectedDisease.name}
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                      selectedDisease.severity === 'High' 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/50' 
                        : selectedDisease.severity === 'Medium' 
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' 
                        : 'bg-green-500/20 text-green-400 border border-green-500/50'
                    }`}>
                      <AlertCircle className="w-4 h-4" />
                      {selectedDisease.severity} Severity
                    </div>
                    
                    <div className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/50 text-sm font-semibold">
                      {selectedDisease.count} Training Samples
                    </div>
                    
                    <div className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/50 text-sm">
                      {selectedDisease.prevalence}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {selectedDisease.description}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <InfoSection 
                  title="Common Symptoms" 
                  items={selectedDisease.symptoms} 
                  color="cyan" 
                  icon="🔍"
                />
                <InfoSection 
                  title="Primary Causes" 
                  items={selectedDisease.causes} 
                  color="purple" 
                  icon="⚠️"
                />
                <InfoSection 
                  title="Treatment Options" 
                  items={selectedDisease.treatment} 
                  color="green" 
                  icon="💊"
                />
                <InfoSection 
                  title="Prevention Tips" 
                  items={selectedDisease.prevention} 
                  color="blue" 
                  icon="🛡️"
                />
              </div>

              <motion.div
                className="mt-8 p-6 bg-red-500/10 border-2 border-red-500/30 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-red-300 font-semibold mb-2 text-lg">
                      ⚕️ Medical Disclaimer
                    </p>
                    <p className="text-red-200/90 text-sm leading-relaxed">
                      This information is for educational purposes only and should not be used as a substitute 
                      for professional medical advice, diagnosis, or treatment. Always consult a qualified 
                      dermatologist or healthcare provider for proper evaluation and personalized treatment plans.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// InfoSection stays the same
function InfoSection({ 
  title, 
  items, 
  color, 
  icon 
}: { 
  title: string
  items: string[]
  color: 'cyan' | 'purple' | 'green' | 'blue'
  icon: string
}) {
  const colorClasses = {
    cyan: {
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      bullet: 'bg-cyan-400'
    },
    purple: {
      text: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      bullet: 'bg-purple-400'
    },
    green: {
      text: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      bullet: 'bg-green-400'
    },
    blue: {
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      bullet: 'bg-blue-400'
    },
  }

  const classes = colorClasses[color]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className={`text-xl font-bold ${classes.text}`}>
          {title}
        </h3>
      </div>
      
      <ul className="space-y-2">
        {items.map((item, i) => (
          <motion.li
            key={i}
            className={`flex items-start gap-3 p-3 rounded-xl ${classes.bg} border ${classes.border}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            whileHover={{ x: 5, scale: 1.02 }}
          >
            <span className={`w-2 h-2 ${classes.bullet} rounded-full mt-2 flex-shrink-0`} />
            <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
