// lib/api.ts
const API_BASE_URL = 'http://localhost:8080/api'

export interface Patient {
  name: string
  age: number
  phone: string
  email: string
}

export interface Diagnosis {
  patientId: number
  diseasePrediction: string
  confidenceScore: number
  imagePath: string
}

export interface AnalysisResult {
  success: boolean
  prediction: string
  confidence: number
  rawResult: string
}

// Analyze skin image
export async function analyzeSkinImage(imageFile: File): Promise<AnalysisResult> {
  const formData = new FormData()
  formData.append('image', imageFile)

  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Analysis failed')
  }

  return response.json()
}

// Create patient
export async function createPatient(patient: Patient) {
  const response = await fetch(`${API_BASE_URL}/patients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patient),
  })

  if (!response.ok) {
    throw new Error('Failed to create patient')
  }

  return response.json()
}

// Get all patients
export async function getAllPatients() {
  const response = await fetch(`${API_BASE_URL}/patients`)
  
  if (!response.ok) {
    throw new Error('Failed to fetch patients')
  }

  return response.json()
}

// Save diagnosis
export async function saveDiagnosis(diagnosis: Diagnosis) {
  const response = await fetch(`${API_BASE_URL}/diagnoses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(diagnosis),
  })

  if (!response.ok) {
    throw new Error('Failed to save diagnosis')
  }

  return response.json()
}

// Get patient diagnoses
export async function getPatientDiagnoses(patientId: number) {
  const response = await fetch(`${API_BASE_URL}/patients/${patientId}/diagnoses`)
  
  if (!response.ok) {
    throw new Error('Failed to fetch diagnoses')
  }

  return response.json()
}
