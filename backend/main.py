from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Permitir solicitudes desde el puerto 5173
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Reemplaza con tu cadena de conexión de MongoDB Atlas
MONGO_URI = "mongodb+srv://alonsoherrera:CLMUJo9kqtP5wybG@digitalskillapp.uwl1zgz.mongodb.net/?retryWrites=true&w=majority&appName=DigitalSkillApp"
client = MongoClient(MONGO_URI)
db = client['DigitalSkillApp']
collection = db['Progreso']

class Documento(BaseModel):
    nombre: str
    test: str
    puntaje: int

@app.post("/add-document")
async def add_document(documento: Documento):
    try:
        result = collection.insert_one(documento.dict())
        return {"inserted_id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Hello, World!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)