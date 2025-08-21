# 🐍 Linguo Backend

This is the **backend service** for **Linguo**, a communication platform designed to facilitate interaction between deaf and hearing individuals.  
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

uvicorn server:app --reload
```
# File Structure
```
Linguo-backend/
├── .env                          # Environment variables (TiDB, OpenAI keys, etc.)
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
├── requirements.txt              # Python dependencies
├── requirements-dev.txt          # Development dependencies
├── pyproject.toml                # Poetry configuration (if using Poetry)
├── README.md                     # Project documentation
├── docker-compose.yml            # Docker setup (FastAPI + RabbitMQ + TiDB)
├── Dockerfile                    # Container definition
├── pytest.ini                   # Test configuration
└── main.py                       # FastAPI application entry point

├── app/                          # Main application directory
│   ├── __init__.py
│   ├── main.py                   # FastAPI app factory & ASGI setup
│   ├── config.py                 # Configuration (TiDB, OpenAI, RabbitMQ settings)
│   ├── database.py               # TiDB connection & session management
│   └── dependencies.py           # Shared dependencies & dependency injection
│
│   ├── core/                     # Core functionality
│   │   ├── __init__.py
│   │   ├── auth.py               # JWT authentication utilities
│   │   ├── security.py           # Password hashing, token validation
│   │   ├── exceptions.py         # Custom exception handlers
│   │   ├── middleware.py         # Custom middleware (CORS, logging)
│   │   └── events.py             # Application startup/shutdown events
│
│   ├── models/                   # SQLAlchemy models (TiDB tables)
│   │   ├── __init__.py
│   │   ├── base.py               # Base model with common fields
│   │   ├── user.py               # User model
│   │   ├── meeting.py            # Meeting/session model
│   │   ├── participant.py        # Meeting participants
│   │   ├── chat_message.py       # Chat messages model
│   │   ├── document.py           # Document model for Linguo Read
│   │   ├── document_chunk.py     # Document chunks with vector embeddings
│   │   ├── sign_gloss.py         # Sign language glosses
│   │   └── sign_pose.py          # 3D pose data for animations
│
│   ├── schemas/                  # Pydantic schemas (request/response)
│   │   ├── __init__.py
│   │   ├── user.py               # User schemas (create, update, response)
│   │   ├── auth.py               # Authentication schemas (login, register)
│   │   ├── meeting.py            # Meeting schemas
│   │   ├── document.py           # Document upload/explanation schemas
│   │   ├── websocket.py          # WebSocket message schemas
│   │   └── common.py             # Common/shared schemas
│
│   ├── api/                      # API routes
│   │   ├── __init__.py
│   │   ├── router.py             # Main API router configuration
│   │   └── v1/                   # API version 1
│   │       ├── __init__.py
│   │       ├── auth.py           # Authentication endpoints
│   │       ├── users.py          # User management endpoints
│   │       ├── meetings.py       # Meeting/room management
│   │       ├── documents.py      # Document upload & RAG endpoints
│   │       └── websocket.py      # WebSocket connection endpoints
│
│   ├── agents/                   # AI Agent modules (Agentic Architecture)
│   │   ├── __init__.py
│   │   ├── base_agent.py         # Base agent class with common functionality
│   │   ├── sign_recognition/     # Sign-to-text agent
│   │   │   ├── __init__.py
│   │   │   ├── agent.py          # Main sign recognition logic
│   │   │   ├── models.py         # MediaPipe + ML model integration
│   │   │   └── preprocessor.py   # Frame preprocessing utilities
│   │   ├── speech_to_text/       # STT agent
│   │   │   ├── __init__.py
│   │   │   ├── agent.py          # Speech recognition logic
│   │   │   └── whisper_client.py # OpenAI Whisper integration
│   │   ├── translation/          # Core translation agent (LLM-powered)
│   │   │   ├── __init__.py
│   │   │   ├── agent.py          # Translation orchestration
│   │   │   ├── text_to_gloss.py  # English to ASL gloss conversion
│   │   │   └── gloss_to_text.py  # ASL gloss to English conversion
│   │   ├── sign_animation/       # 3D animation generation agent
│   │   │   ├── __init__.py
│   │   │   ├── agent.py          # Animation pipeline orchestration
│   │   │   ├── pose_retriever.py # TiDB pose data queries
│   │   │   └── interpolation.py  # Co-articulation & smooth transitions
│   │   ├── text_to_speech/       # TTS agent
│   │   │   ├── __init__.py
│   │   │   ├── agent.py          # Text-to-speech logic
│   │   │   └── gtts_client.py    # Google TTS integration
│   │   └── document_explanation/ # RAG pipeline agent
│   │       ├── __init__.py
│   │       ├── agent.py          # RAG orchestration
│   │       ├── document_processor.py # Document chunking & embedding
│   │       ├── vector_search.py  # TiDB vector search queries
│   │       └── explanation_generator.py # LLM explanation generation
│
│   ├── services/                 # Business logic layer
│   │   ├── __init__.py
│   │   ├── auth_service.py       # Authentication business logic
│   │   ├── user_service.py       # User management logic
│   │   ├── meeting_service.py    # Meeting orchestration
│   │   ├── document_service.py   # Document processing coordination
│   │   ├── websocket_service.py  # WebSocket connection management
│   │   └── agent_orchestrator.py # Agent coordination & message routing
│
│   ├── repositories/             # Data access layer
│   │   ├── __init__.py
│   │   ├── base_repository.py    # Base repository with common CRUD
│   │   ├── user_repository.py    # User data operations
│   │   ├── meeting_repository.py # Meeting data operations
│   │   ├── document_repository.py # Document & chunk operations
│   │   ├── sign_repository.py    # Sign gloss & pose data operations
│   │   └── vector_repository.py  # TiDB vector search operations
│
│   ├── messaging/                # Message broker integration
│   │   ├── __init__.py
│   │   ├── broker.py             # RabbitMQ connection management
│   │   ├── publisher.py          # Message publishing utilities
│   │   ├── consumer.py           # Message consumption utilities
│   │   ├── topics.py             # Message topic definitions
│   │   └── handlers/             # Message handlers for each agent
│   │       ├── __init__.py
│   │       ├── sign_handler.py
│   │       ├── speech_handler.py
│   │       ├── translation_handler.py
│   │       └── animation_handler.py
│
│   ├── websocket/                # WebSocket real-time communication
│   │   ├── __init__.py
│   │   ├── connection_manager.py # WebSocket connection management
│   │   ├── signaling_server.py   # WebRTC signaling coordination
│   │   ├── meeting_handler.py    # Real-time meeting handlers
│   │   ├── animation_streamer.py # 3D pose data streaming
│   │   └── events.py             # WebSocket event definitions
│
│   ├── ai/                       # AI/ML integration modules
│   │   ├── __init__.py
│   │   ├── openai_client.py      # OpenAI API integration (GPT-4, embeddings)
│   │   ├── mediapipe_client.py   # MediaPipe hand tracking
│   │   ├── embeddings.py         # Text embedding utilities
│   │   ├── llm_prompts.py        # LLM prompt templates
│   │   └── model_loader.py       # ML model loading utilities
│
│   ├── utils/                    # Utility functions
│   │   ├── __init__.py
│   │   ├── file_handler.py       # File upload/processing
│   │   ├── validators.py         # Input validation helpers
│   │   ├── formatters.py         # Data formatting utilities
│   │   ├── timing.py             # Performance timing utilities
│   │   └── helpers.py            # General helper functions
│
│   └── static/                   # Static files
│       ├── uploads/              # Uploaded documents
│       ├── models/               # 3D hand models (glTF files)
│       └── assets/               # Static assets
│
├── tests/                        # Test suite
│   ├── __init__.py
│   ├── conftest.py               # Pytest configuration & fixtures
│   ├── test_auth.py              # Authentication tests
│   ├── test_users.py             # User endpoint tests
│   ├── test_meetings.py          # Meeting endpoint tests
│   ├── test_documents.py         # Document & RAG tests
│   ├── test_agents/              # Agent-specific tests
│   │   ├── test_sign_recognition.py
│   │   ├── test_translation.py
│   │   └── test_document_explanation.py
│   ├── test_websocket.py         # WebSocket tests
│   └── test_integration.py       # End-to-end integration tests
│
├── migrations/                   # Database migrations (Alembic)
│   ├── alembic.ini
│   ├── env.py
│   ├── script.py.mako
│   └── versions/
│       ├── 001_initial_tables.py
│       ├── 002_add_vector_index.py
│       └── 003_sign_language_data.py
│
├── scripts/                      # Utility scripts
│   ├── __init__.py
│   ├── init_db.py                # Database initialization
│   ├── seed_data.py              # Sample data seeding
│   ├── populate_signs.py         # Import sign language glosses & poses
│   ├── test_agents.py            # Agent testing script
│   └── performance_test.py       # Load testing script
│
├── data/                         # Data files
│   ├── sign_glosses/             # Sign language dictionary
│   │   ├── asl_glosses.json      # ASL gloss definitions
│   │   └── pose_mappings.json    # Gloss to pose mappings
│   ├── sample_documents/         # Sample documents for testing
│   └── 3d_models/                # 3D hand model files
│
├── docs/                         # Documentation
│   ├── api.md                    # API documentation
│   ├── architecture.md           # System architecture guide
│   ├── agent_communication.md    # Agent messaging patterns
│   ├── tidb_integration.md       # TiDB vector search guide
│   ├── deployment.md             # Deployment guide
│   └── hackathon_demo.md         # Demo script & presentation guide
│
└── monitoring/                   # Monitoring & observability
    ├── __init__.py
    ├── metrics.py                # Performance metrics collection
    ├── logging_config.py         # Structured logging configuration
    └── health_checks.py          # System health monitoring
```