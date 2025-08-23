from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ...database import get_db
from ...core.auth import get_current_user
from ...schemas.user import UserOut
from ...models.user import User

router = APIRouter()

@router.get("/me", response_model=UserOut)
def read_me(current_user: User = Depends(get_current_user)):
    return current_user
