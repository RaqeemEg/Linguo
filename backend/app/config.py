from dotenv import load_dotenv
import os

load_dotenv()


DATABASE_URL = os.getenv("DATABASE_URL")

# Use DATABASE_URL but without the DB part
DATABASE_HOST = os.getenv("TIDB_HOST")
DATABASE_USER = os.getenv("TIDB_USER")
DATABASE_PASSWORD = os.getenv("TIDB_PASSWORD")
DATABASE_database = os.getenv("TIDB_database")
DATABASE_ssl_verify_cert = os.getenv("TIDB_ssl_verify_cert")
DATABASE_ssl_verify_identity = os.getenv("TIDB_ssl_verify_identity")
DATABASE_ssl_ca = os.getenv("TIDB_ssl_ca")
NEW_DB_NAME = "linguo_db"