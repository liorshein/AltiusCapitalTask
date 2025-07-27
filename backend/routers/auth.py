from fastapi import APIRouter, HTTPException, Response, Request, status
from models.auth import LoginRequest, LoginResponse
from services.auth_service import auth_service
from services.token_service import token_service
from exceptions import (
    InvalidCredentialsException,
    WebsiteConnectionException,
    SessionExpiredException
)

router = APIRouter()


def get_session_token(request: Request) -> str:
    """Extract session token from cookie"""
    session_token = request.cookies.get("session_token")

    if not session_token:
        raise HTTPException(status_code=401, detail="Missing session token")

    return session_token


@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest, response: Response):
    try:
        session_data = await auth_service.authenticate(
            website=request.website,
            email=request.email,
            password=request.password
        )

        session_token = token_service.create_token(session_data)

        response.set_cookie(
            key="session_token",
            value=session_token,
            httponly=True,
            secure=True,
            samesite="none",
            max_age=24 * 60 * 60
        )

        return LoginResponse(
            success=True,
            website=request.website,
            message="Authentication successful"
        )

    except InvalidCredentialsException:
        raise InvalidCredentialsException()

    except WebsiteConnectionException:
        raise WebsiteConnectionException()

    except Exception:
        return HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unexpected server error"
        )

@router.post("/validate")
async def validate_session(request: Request):
    session_token = get_session_token(request)

    try:
        session_data = token_service.verify_token(session_token)
        return {
            "valid": True,
            "website": session_data.website,
            "email": session_data.email,
            "authenticated_at": session_data.authenticated_at
        }
    except SessionExpiredException as e:
        raise HTTPException(status_code=401, detail=e.detail)


@router.post("/logout")
async def logout(response: Response):
    # Simply clear the session cookie (JWT is stateless)
    response.delete_cookie(
        key="session_token",
        secure=True,
        samesite="none"
    )

    return {
        "success": True,
        "message": "Logged out successfully"
    }
