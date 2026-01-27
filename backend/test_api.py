import pytest
import asyncio
from httpx import AsyncClient
from main import app
from database import engine, Base

# Setup database for testing
@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

@pytest.fixture(scope="module")
async def client():
    # Create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac
    
    # Drop tables (optional, or rely on recreating)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

@pytest.mark.asyncio
async def test_create_paste(client):
    response = await client.post("/pastes/", json={"content": "test content"})
    assert response.status_code == 200
    data = response.json()
    assert data["content"] == "test content"
    assert "id" in data

@pytest.mark.asyncio
async def test_get_paste(client):
    # Create
    res_create = await client.post("/pastes/", json={"content": "to be read"})
    paste_id = res_create.json()["id"]
    
    # Read
    response = await client.get(f"/pastes/{paste_id}")
    assert response.status_code == 200
    assert response.json()["content"] == "to be read"

@pytest.mark.asyncio
async def test_expiration_views(client):
    # Create with 1 view
    res = await client.post("/pastes/", json={"content": "view once", "views_left": 1})
    paste_id = res.json()["id"]
    
    # View 1
    resp1 = await client.get(f"/pastes/{paste_id}")
    assert resp1.status_code == 200
    
    # View 2 (should fail)
    resp2 = await client.get(f"/pastes/{paste_id}")
    # Note: Logic in crud.py: if views_left <= 0, deletes and returns None.
    # So the *next* call after the last allowed view should fail.
    # Wait, in get_paste:
    # if paste.views_left <= 0: delete, return None
    # else: views_left -= 1
    # So if I set views_left=1:
    # 1st call: views_left is 1. Not <= 0. Decrement to 0. Return paste.
    # 2nd call: views_left is 0. <= 0. Delete. Return None.
    assert resp2.status_code == 404
