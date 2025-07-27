from fastapi import HTTPException, status


class AuthenticationException(HTTPException):
    def __init__(self, detail: str = "Authentication failed"):
        super().__init__(status_code=status.HTTP_401_UNAUTHORIZED, detail=detail)


class InvalidCredentialsException(AuthenticationException):
    def __init__(self, detail: str = "Invalid credentials"):
        super().__init__(detail=detail)


class WebsiteConnectionException(HTTPException):
    def __init__(self, detail: str = "Failed to connect to website"):
        super().__init__(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=detail)


class SessionExpiredException(HTTPException):
    def __init__(self, detail: str = "Session has expired"):
        super().__init__(status_code=status.HTTP_401_UNAUTHORIZED, detail=detail)


class UnsupportedWebsiteException(HTTPException):
    def __init__(self, detail: str = "Unsupported website"):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)
