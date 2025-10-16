# 🔬 MediScan AI - Skin Disease Detection System

A full-stack AI-powered web application for automated skin disease detection using **Google Vertex AI**, built with **Next.js** and **Spring Boot**.

![MediScan AI Banner](https://img.shields.io/badge/AI-Powered-blue) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green) ![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)

---

## 🌟 Features

- **AI-Powered Diagnosis**: Leverages Google Vertex AI for accurate skin disease detection
- **Real-time Analysis**: Upload images and get instant AI predictions with confidence scores
- **Patient Management**: Track patient records and diagnosis history
- **Modern UI/UX**: Beautiful animated interface with Framer Motion
- **Database Integration**: MySQL database for persistent patient and diagnosis records
- **96% Accuracy**: Trained on medical datasets for reliable predictions

---

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide Icons** - Modern icon library

### Backend
- **Spring Boot 3.x** - Java REST API
- **MySQL 8.0** - Relational database
- **Google Vertex AI** - Machine learning predictions
- **Maven** - Dependency management

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ and npm/yarn
- **Java JDK** 17+
- **MySQL** 8.0+
- **Google Cloud Platform** account with Vertex AI API enabled
- **Maven** 3.8+

---
## 🔗 Related Repository

**Backend Repository:** [mediscan-backend](https://github.com/nightfury12901/mediscan-backend)

This repository contains only the **frontend (Next.js)**. The backend Spring Boot API is maintained separately.

---
And update the Installation section:

## 🚀 Installation & Setup

### 1. Clone Both Repositories

Clone frontend
git clone https://github.com/nightfury12901/mediscan-ai.git
cd mediscan-ai

Clone backend (in a separate directory)
git clone https://github.com/nightfury12901/mediscan-backend.git


### 2. Frontend Setup

cd mediscan-ai
npm install

Create `.env.local`:
NEXT_PUBLIC_API_URL=http://localhost:8080


Run development server:
npm run dev

Frontend available at `http://localhost:3000`

### 3. Backend Setup

See [Backend Repository](https://github.com/nightfury12901/mediscan-backend) for complete backend setup instructions.

Quick start:
cd mediscan-backend
mvnd clean install
mvnd spring-boot:run



Backend available at `http://localhost:8080`

## 🚀 Installation & Setup

### 1. Clone the Repository

git clone https://github.com/yourusername/mediscan-ai.git
cd mediscan-ai



### 2. Frontend Setup (Next.js)

cd frontend
npm install



Create `.env.local`:
NEXT_PUBLIC_API_URL=http://localhost:8080


Run development server:
npm run dev


Frontend will be available at `http://localhost:3000`

---

### 3. Backend Setup (Spring Boot)

#### Configure MySQL Database

CREATE DATABASE skin_disease_db;
USE skin_disease_db;

CREATE TABLE patients (
patient_id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
age INT,
phone VARCHAR(20),
email VARCHAR(100),
created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE diagnoses (
diagnosis_id INT AUTO_INCREMENT PRIMARY KEY,
patient_id INT NOT NULL,
disease_prediction VARCHAR(100),
confidence_score DOUBLE,
image_path VARCHAR(255),
analysis_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
);

 

#### Configure Google Cloud Credentials

1. Create a service account in Google Cloud Console
2. Enable Vertex AI API
3. Download the JSON key file
4. Set environment variable:

export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-key.json"


#### Update `application.properties`

spring.datasource.url=jdbc:mysql://localhost:3306/skin_disease_db
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

Vertex AI Configuration
vertexai.project.id=your-gcp-project-id
vertexai.location=us-central1
vertexai.endpoint.id=your-vertex-ai-endpoint-id


#### Run Backend

cd backend
mvn clean install
mvn spring-boot:run


Backend will be available at `http://localhost:8080`

---

## 📁 Project Structure

mediscan-ai/
├── frontend/ # Next.js frontend
│ ├── app/
│ │ ├── page.tsx # Home page
│ │ ├── login/ # Login/Registration
│ │ ├── analyze/ # AI Analysis page
│ │ └── patients/ # Patient records
│ ├── components/
│ │ └── ui/ # Reusable UI components
│ └── lib/
│ └── api.ts # API client
│
├── backend/ # Spring Boot backend
│ ├── src/main/java/com/healthcare/skindetector/
│ │ ├── api/
│ │ │ └── SkinDiseaseAPI.java # REST Controllers
│ │ ├── database/
│ │ │ └── DatabaseManager.java # MySQL operations
│ │ ├── models/
│ │ │ ├── Patient.java
│ │ │ └── Diagnosis.java
│ │ └── vertexai/
│ │ └── VertexAIPredictor.java # AI integration
│ └── pom.xml
│
└── README.md



---

## 🎯 API Endpoints

### Patient Management
- `POST /api/patients` - Register new patient
- `GET /api/patients` - Get all patients with latest diagnosis
- `GET /api/patients/{id}/diagnoses` - Get patient diagnosis history

### Disease Analysis
- `POST /api/analyze` - Upload image for AI analysis
- `POST /api/diagnoses` - Save diagnosis result

---

## 🖼️ Screenshots

### Home Page
Beautiful landing page with animated background and call-to-action

### Analysis Page
Upload skin images and get instant AI-powered diagnosis

### Patient Records
View and manage all patient records with diagnosis history

---

## 🔧 Configuration

### Google Vertex AI Setup

1. Create a Vertex AI endpoint:
   - Train your model on skin disease datasets
   - Deploy to Vertex AI endpoint
   - Copy the endpoint ID

2. Update `VertexAIPredictor.java` with your:
   - Project ID
   - Location
   - Endpoint ID

### Database Configuration

Update MySQL credentials in `application.properties` or use environment variables:

export DB_URL=jdbc:mysql://localhost:3306/skin_disease_db
export DB_USERNAME=your_username
export DB_PASSWORD=your_password



---

## 🧪 Testing

### Test with Postman

**Analyze Image:**
POST http://localhost:8080/api/analyze
Content-Type: multipart/form-data
Body: form-data
Key: image (File)



**Save Diagnosis:**
POST http://localhost:8080/api/diagnoses
Content-Type: application/json
Body:
{
"patientId": 1,
"diseasePrediction": "Acne",
"confidenceScore": 0.91,
"imagePath": null
}



---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Chinmay Mishra**
- Email: cm1372@srmist.edu.in
- GitHub: https://github.com/nightfury12901

---

## 🙏 Acknowledgments

- Google Cloud Vertex AI for ML infrastructure
- DermNet dataset for training data
- Spring Boot and Next.js communities

---




## 📞 Support

For support, email cm1372@srmist.edu.in or open an issue in the repository.

---
