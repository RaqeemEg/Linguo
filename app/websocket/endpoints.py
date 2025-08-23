from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, Query
from jose import jwt, JWTError
from ..config import settings
from ..websocket.connection_manager import ConnectionManager
from ..database import get_db
from sqlalchemy.orm import Session
from ..models.user import User

router = APIRouter()
manager = ConnectionManager()

def authenticate_ws(token: str, db: Session) -> User | None:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
    except JWTError:
        return None
    return db.query(User).filter(User.email == email).first()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, token: str = Query(None), db: Session = Depends(get_db)):
    if not token:
        await websocket.close(code=4401)
        return
    user = authenticate_ws(token, db)
    if not user:
        await websocket.close(code=4401)
        return

    await manager.connect(user.id, websocket)
    await manager.broadcast(f"🔵 User {user.username} joined")

    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"{user.username}: {data}")
    except WebSocketDisconnect:
        manager.disconnect(user.id)
        await manager.broadcast(f"⚫ User {user.username} left")
