import pymysql
from app.config import (
    DATABASE_HOST,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_database,
    DATABASE_ssl_ca,
    DATABASE_ssl_verify_cert,
    DATABASE_ssl_verify_identity,
)


# Connect to TiDB (cluster level, no db specified yet)
connection = pymysql.connect(
    host=DATABASE_HOST,
    port=4000,
    user=DATABASE_USER,
    password=DATABASE_PASSWORD,
    ssl_verify_cert=DATABASE_ssl_verify_cert,
    ssl_verify_identity=DATABASE_ssl_verify_identity,
    ssl_ca=DATABASE_ssl_ca,
)

cursor = connection.cursor()

# create the database if not exists
cursor.execute(f"CREATE DATABASE IF NOT EXISTS {NEW_DB_NAME};")
print(f"Database '{NEW_DB_NAME}' is ready ✅")

cursor.close()
connection.close()
