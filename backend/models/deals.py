from pydantic import BaseModel
from typing import List, Dict, Optional


class Deal(BaseModel):
    id: int
    title: str
    created_at: str
    firm: str
    asset_class: str
    deal_status: str
    currency: str
    deal_capital_seeker_email: str
    files_available: bool = False


class DealsApiResponse(BaseModel):
    data: List[Deal]
    message: str


class DealFile(BaseModel):
    id: int
    created_at: str
    updated_at: str
    account_id: int
    upload_type: str
    state: str
    user_id: int
    investor_id: Optional[int]
    document_type: Optional[str]
    document_type_altius: Optional[str]
    is_private: bool
    deal_id: int
    group_id: Optional[int]
    form_id: Optional[int]
    question_id: Optional[int]
    question_uuid: Optional[str]
    section_id: Optional[int]
    document_id: Optional[int]
    template_file_id: Optional[int]
    name: str
    path: str
    type: str
    deleted_at: Optional[str]
    size_in_bytes: int
    tags: Optional[str]
    dataroom_file_id: Optional[int]
    file_url: str
    document_section_id: Optional[int]


class DealFilesApiResponse(BaseModel):
    data: Dict[str, DealFile]
    message: str