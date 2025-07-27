import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, deals
from middleware.auth import verify_cookie_token

app = FastAPI(
    title="Website Crawler API",
    description="API for authenticating and crawling website data",
    version="1.0.0"
)

from config import settings

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])
app.include_router(deals.router, prefix="/api/deals", tags=["deals"], dependencies=[Depends(verify_cookie_token)])


@app.get("/")
async def root():
    return {"message": "Website Crawler API"}


@app.get("/health")
async def health():
    return {"status": "healthy", "message": "API is running"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
