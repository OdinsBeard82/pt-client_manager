from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict
from database import Base, engine, get_db
from model import Client
from sqlalchemy.orm import Session
from typing import Optional

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

class ClientUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone_number: Optional[str] = None
    package: Optional[str] = None
    sessions_count: Optional[int] = None

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
@app.get("/clients/{client_id}", response_model=ClientRead)
def get_client(client_id: int, db: Session = Depends(get_db)):
    client = db.query(Client).filter(Client.id == client_id).first()
    if client is None:
        raise HTTPException(status_code=404, detail="Client not found")
    return client


@app.put("/clients/{client_id}", response_model=ClientRead)
def update_client(client_id: int, client: ClientUpdate, db: Session = Depends(get_db)):
    client_Update = db.query(Client).filter(Client.id == client_id).first()
    if client_Update is None:
        raise HTTPException(status_code=404, detail="Client not found")
    if client.name is not None: client_Update.name = client.name
    if client.email is not None: client_Update.email = client.email
    if client.phone_number is not None: client_Update.phone_number = client.phone_number
    if client.package is not None: client_Update.package = client.package
    if client.sessions_count is not None: client_Update.sessions_count = client.sessions_count
    db.commit()
    db.refresh(client_Update)
    return client_Update

@app.delete("/clients/{client_id}", response_model=ClientRead)
def delete_client(client_id: int, db: Session = Depends(get_db)):
    client_Delete = db.query(Client).filter(Client.id == client_id).first()
    if client_Delete is None:
        raise HTTPException(status_code=404, detail="Client not found")
    db.delete(client_Delete)
    db.commit()
    return client_Delete

