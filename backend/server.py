from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.dependencies import get_db

app = FastAPI()

@app.get("/db-check")
def db_check(db: Session = Depends(get_db)):
    try:
        result = db.execute(text("SELECT 1")).scalar()
        return {"status": "ok", "result": result}
    except Exception as e:
        return {"status": "error", "detail": str(e)}
