# SignSync: Bridging Communication Gaps
![SignSync Logo](./assets/logo.jpeg)

## About The Project
SignSync is an innovative platform that facilitates seamless communication between individuals who use sign language and those who communicate through speech. It create a more inclusive world by leveraging cutting-edge AI to provide real-time translation, making conversations accessible to everyone, regardless of their primary mode of communication.

The project consists of two main components:

- **Live Meeting Translation**: A virtual meeting room where a deaf person's sign language is converted into audible speech, and a hearing person's speech is translated into a real-time 3D sign language animation.  
- **Document Explanation Tool**: An assistive feature that allows users to upload a text document, select a confusing passage, and receive a clear explanation in sign language via a 3D animated hand.  

---

## Key Features
- 🗣️ **Sign-to-Speech**: Real-time translation of sign language gestures from a video feed into synthesized speech.  
- ✍️ **Speech-to-Sign**: Live transcription of spoken words into a fluid, easy-to-understand 3D hand animation that performs sign language.  
- 📖 **Document Accessibility**: Upload text documents and get complex sentences or paragraphs explained in sign language.  
- 🌐 **Web-Based & Accessible**: Runs entirely in the browser with no required installations for users.  
- ⚙️ **Scalable Microservices**: A robust backend architecture built for reliability and performance.  

---

## Technology Stack
- 🎨 **Frontend**: React (for a dynamic and responsive user interface).  
- 🖐️ **3D Rendering**: Three.js (via react-three-fiber) for rendering 3D hand animations in the browser.  
- 🐍 **Backend**: Python with FastAPI (high performance & asynchronous).  
- 🗄️ **Database**: TiDB (distributed, MySQL-compatible SQL database with vector search).  
- 📡 **Real-time Communication**: WebRTC (peer-to-peer streaming) & WebSockets (signaling/data streaming).  
- 📬 **Inter-Service Communication**: RabbitMQ (asynchronous message broker).  

---

## 📚 Documentation
- [System Architecture](./documents/ARCHITECTURE.md)  
- [Data Model (ER Diagram)](./documents/ER-Diagram.md)  
