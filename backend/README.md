# 🐍 Linguo Backend

This is the **backend service** for **SignSync**, a communication platform designed to facilitate interaction between deaf and hearing individuals.  
It is built with **FastAPI** in a **monolithic architecture** with a modular internal structure.

---

## 🚀 Features
- User authentication & profiles  
- Real-time meeting translation (speech ↔ sign language)  
- WebRTC + WebSocket support for video/audio/chat  
- Document upload & explanation (RAG pipeline with TiDB vector search)  
- Modular monolithic design (easy to maintain, future-ready for microservices)  

---

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/signsync-backend.git
cd signsync-backend
### 2. Create & Activate Virtual Environment
python3 -m venv venv
source venv/bin/activate   # On macOS/Linux
venv\Scripts\activate      # On Windows

### 3. Install Dependencies
pip install -r requirements.txt

### 4. Set Environment Variables
Create a .env file in the project root:

DATABASE_URL=
SECRET_KEY=
ACCESS_TOKEN_EXPIRE_MINUTES=30

### ▶️ Running the Backend
fastapi dev main.py

