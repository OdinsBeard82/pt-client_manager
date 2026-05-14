from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict
from database import Base, engine, get_db
from model import Client
from sqlalchemy.orm import Session

Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://localhost:8080",
    ]

app = FastAPI()
@app.get("/")
def read_root():    return {"Hello": "World"}

class ClientCreate(BaseModel):
    name: str
    email: str
    phone_number: str
    package: str
    sessions_count: int
    
class ClientRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str
    phone_number: str
    package: str
    sessions_count: int

@app.post("/clients/", response_model=ClientRead)
def create_client(client: ClientCreate, db: Session = Depends(get_db)):
    new_client = Client(**client.model_dump())
    db.add(new_client)
    db.commit()
    db.refresh(new_client)
    return new_client

@app.get("/clients/", response_model=list[ClientRead])
def get_clients(db: Session = Depends(get_db)):
    return db.query(Client).all()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
