from sqlalchemy.orm import declarative_base
from sqlalchemy.types import UserDefinedType


Base = declarative_base()

# A custom type for VECTOR can be defined if not using a specific dialect.
# For now, we will define it but it might need tidb-sqlalchemy to work perfectly.
class VECTOR(UserDefinedType):
    def get_col_spec(self, **kw):
        return "VECTOR(1536)"
