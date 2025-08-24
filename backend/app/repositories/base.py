from abc import ABC, abstractmethod
from typing import Generic, TypeVar, Optional, List
from sqlalchemy.orm import Session

T = TypeVar("T")

# Generic CRUD Repository for avoiding Duplication from the recreation of the normal  4 CRUDs in each model
class BaseRepository(ABC, Generic[T]):
    def __init__(self, db: Session, model_class: type):
        self.db = db
        self.model_class = model_class

    # (**) means accept any number of arguments and put them in a dictionary called kwargs(keyword arguments)
    def create(self, **kwargs) -> T:
        instance = self.model_class(**kwargs)
        self.db.add(instance)
        self.db.commit()
        self.db.refresh(instance)
        return instance

    def get_by_id(self, id: int) -> Optional[T]:
        return self.db.query(self.model_class).filter(self.model_class.id == id).first()

    def get_all(self) -> List[T]:
        return self.db.query(self.model_class).all()

    def update(self, instance: T, **kwargs) -> T:
        for key, value in kwargs.items():
            setattr(instance, key, value)
        self.db.commit()
        self.db.refresh(instance)
        return instance

    def delete(self, instance: T) -> bool:
        try:
            self.db.delete(instance)
            self.db.commit()
            return True
        except Exception:
            self.db.rollback()
            return False
