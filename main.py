from fastapi import FastAPI, Depends
from pydantic import BaseModel
from database import Base, engine, get_db
from model import Client
from sqlalchemy.orm import Session

Base.metadata.create_all(bind=engine)

app = FastAPI()
@app.get("/")
def read_root():    return {"Hello": "World"}

class ClientCreate(BaseModel):
    name: str
    email: str
    phone_number: str
    package: str
    sessions_count: int

@app.post("/clients/")
def create_client(client: ClientCreate, db: Session = Depends(get_db)):
    new_client = Client(**client.model_dump())
    db.add(new_client)
    db.commit()
    db.refresh(new_client)
    return {"message": "Client information received successfully", "client": new_client}