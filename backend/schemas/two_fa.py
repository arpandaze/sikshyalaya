from pydantic import BaseModel


class Two_FA_Confirm(BaseModel):
    totp: int
