from fastapi import APIRouter, HTTPException, Depends
from typing import List
from services.deals_service import deals_service
from middleware.auth import verify_cookie_token
from models.auth import SessionData
from models.deals import Deal

router = APIRouter()


@router.get("", response_model=List[Deal])
async def get_deals(session_data: SessionData = Depends(verify_cookie_token)):
    try:
        api_response = await deals_service.get_deals(session_data)
        return api_response.data

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error fetching deals: {str(e)}")


@router.get("/{deal_id}/file")
async def get_deal_file_url(deal_id: int, session_data: SessionData = Depends(verify_cookie_token)):
    try:
        file_url = await deals_service.get_deal_file_url(session_data, deal_id)
        return {"file_url": file_url}

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error fetching deal file URL: {str(e)}")
