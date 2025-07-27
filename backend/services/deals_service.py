import httpx
from typing import Dict, List, Any
from models.auth import WebsiteEnum, SessionData
from models.deals import DealsApiResponse, DealFilesApiResponse
from backend.models.exceptions import (
    WebsiteConnectionException
)
from config import settings

class WebsiteDealsService:
    def __init__(self):
        self.client = httpx.AsyncClient(timeout=30.0)
        self.website_configs = {
            WebsiteEnum.FO1: {
                "base_url": settings.fo1_base_url,
                "deals_endpoint": "/v0.0.2/deals-list",
                "deals_files": "/v0.0.3/deals/{deal_id}/files"
            },
            WebsiteEnum.FO2: {
                "base_url": settings.fo2_base_url,
                "deals_endpoint": "/v0.0.2/deals-list",
                "deals_files": "/v0.0.3/deals/{deal_id}/files"
            }
        }

    async def get_deals(self, session_data: SessionData) -> DealsApiResponse:
        config = self.website_configs[session_data.website]
        deals_url = f"{config['base_url']}{config['deals_endpoint']}"

        try:
            response = await self.client.post(
                deals_url,
                cookies=session_data.cookies
            )
            
            deals_data = response.json()
            parsedData = DealsApiResponse(**deals_data)

            for deal in parsedData.data:
                try:
                    files_response = await self.get_deal_files(session_data, deal.id)
                    deal.files_available = len(files_response.data) > 0
                except:
                    deal.files_available = False
            
            return parsedData
                
        except httpx.RequestError as e:
            raise WebsiteConnectionException(f"Failed to fetch deals: {str(e)}")
        except Exception:
            return DealsApiResponse(data=[], message="Error occurred")

    async def get_deal_files(self, session_data: SessionData, deal_id: int) -> DealFilesApiResponse:
        config = self.website_configs[session_data.website]
        files_url = f"{config['base_url']}{config['deals_files'].format(deal_id=deal_id)}"
        try:
            response = await self.client.get(
                files_url,
                cookies=session_data.cookies
            )
            
            files_data = response.json()

            return DealFilesApiResponse(**files_data)
                
        except httpx.RequestError as e:
            raise WebsiteConnectionException(f"Failed to fetch deal files: {str(e)}")
        except Exception:
            return DealFilesApiResponse(data={}, message="Error occurred")

    async def get_deal_file_url(self, session_data: SessionData, deal_id: int) -> str:
        """Get the first available file URL for a deal"""
        try:
            files_response = await self.get_deal_files(session_data, deal_id)
            if files_response.data:
                # Get the first file from the dictionary
                first_file = next(iter(files_response.data.values()))
                return first_file.file_url
            else:
                raise WebsiteConnectionException("No files found for this deal")
                
        except httpx.RequestError as e:
            raise WebsiteConnectionException(f"Failed to fetch deal file URL: {str(e)}")

deals_service = WebsiteDealsService()