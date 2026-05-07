from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()
@app.get("/")
def read_root():    return {"Hello": "World"}

class Client(BaseModel):
    name: str
    email: str
    phone_number: str
    package: str
    sessions_count: int

hold_clients_info = []
@app.post("/clients/")
def create_client(client: Client):
    hold_clients_info.append(client)
    return {"message": "Client information received successfully", "client": client}