from fastapi import FastAPI, Depends, WebSocket

from sqlalchemy.orm import Session
from sqlalchemy import text
from app.dependencies import get_db
from app.database import Base, engine


Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/db-check")
def db_check(db: Session = Depends(get_db)):
    try:
        result = db.execute(text("SELECT 1")).scalar()
        return {"status": "ok", "result": result}
    except Exception as e:
        return {"status": "error", "detail": str(e)}


# use uvicorn to run the server
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
