from fastapi import HTTPException, Depends, Request, Response
from services.token_service import token_service
from models.auth import SessionData
from exceptions import SessionExpiredException


async def verify_cookie_token(request: Request, response: Response) -> SessionData:
    """
    Middleware function to verify JWT token and return session data.
    Revokes cookie if token is invalid.
    """
    session_token = request.cookies.get("session_token")

    if not session_token:
        raise HTTPException(status_code=401, detail="Missing session token")

    try:
        session_data = token_service.verify_token(session_token)
        return session_data
    except SessionExpiredException as e:
        # Revoke the invalid/expired cookie
        response.delete_cookie("session_token")
        raise HTTPException(status_code=401, detail=e.detail)


def require_auth():
    """
    Dependency factory that returns the auth verification function.
    Use this to apply authentication to specific routes.
    """
    return Depends(verify_cookie_token)
