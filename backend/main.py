from fastapi import FastAPI, Depends, WebSocket

from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import Base, engine
from app.api import router
from app.dependencies import get_db

app = FastAPI()

# Create all the DB tables
Base.metadata.create_all(bind=engine)


@app.get("/db-check")
def db_check(db: Session = Depends(get_db)):
    try:
        result = db.execute(text("SELECT 1")).scalar()
        return {"status": "ok", "result": result}
    except Exception as e:
        return {"status": "error", "detail": str(e)}


# Mounting The main api into versions
app.include_router(router.api_router)


#  Run the server using ASGI(uvicorn)
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
