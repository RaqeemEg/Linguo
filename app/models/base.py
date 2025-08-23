from sqlalchemy.orm import declared_attr, declarative_mixin
from sqlalchemy import Integer
from sqlalchemy.orm import Mapped, mapped_column

@declarative_mixin
class BaseMixin:
    @declared_attr.directive
    def __tablename__(cls) -> str:  # type: ignore
        return cls.__name__.lower()

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
