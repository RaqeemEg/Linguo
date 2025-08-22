import pymysql
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Use DATABASE_URL but without the DB part
DATABASE_HOST = os.getenv("TIDB_HOST")
DATABASE_USER = os.getenv("TIDB_USER")
DATABASE_PASSWORD = os.getenv("TIDB_PASSWORD")
DATABASE_database = os.getenv("TIDB_database")
DATABASE_ssl_verify_cert = os.getenv("TIDB_ssl_verify_cert")
DATABASE_ssl_verify_identity = os.getenv("TIDB_ssl_verify_identity")
DATABASE_ssl_ca = os.getenv("TIDB_ssl_ca")
NEW_DB_NAME = "linguo_db"


# Connect to TiDB (cluster level, no db specified yet)
connection = pymysql.connect(
  host = DATABASE_HOST,
  port = 4000,
  user = DATABASE_USER,
  password = DATABASE_PASSWORD,
  database = DATABASE_database,
  ssl_verify_cert = DATABASE_ssl_verify_cert,
  ssl_verify_identity = DATABASE_ssl_verify_identity,
  ssl_ca = DATABASE_ssl_ca
)

cursor = connection.cursor()

#create the database if not exists
cursor.execute(f"CREATE DATABASE IF NOT EXISTS {NEW_DB_NAME};")
print(f"Database '{NEW_DB_NAME}' is ready ✅")

cursor.close()
connection.close()
