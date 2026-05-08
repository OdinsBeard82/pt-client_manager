from database import Base
from sqlalchemy import Column, Integer, String

class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    phone_number = Column(String)
    package = Column(String)
    sessions_count = Column(Integer)
