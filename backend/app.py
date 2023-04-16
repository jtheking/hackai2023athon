from typing import Optional
from fastapi import FastAPI
from respell import *
from dotenv import load_dotenv

from starlette.requests import Request
from starlette.responses import Response
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache
from fastapi_cache.coder import JsonCoder
from redis import asyncio as aioredis

load_dotenv() 
app = FastAPI()


@app.get("/")
def read_root():
    return {"status": "up"}


class RecipeBody(BaseModel):
    ingredients: list[str]

EXPIRE = 60*60*24

def key_builder(
        func,
        namespace: Optional[str] = "",
        request: Optional[Request] = None,
        response: Optional[Response] = None,
        *args,
        **kwargs,
):
    prefix = FastAPICache.get_prefix()
    use = kwargs["kwargs"]
    del use['req']
    cache_key = f"{prefix}:{namespace}:{func.__module__}:{func.__name__}:{use}"
    print("cache_key", cache_key)
    return cache_key

@app.post("/image")
@cache(expire=EXPIRE, coder=JsonCoder)
async def gen_image(req: Request, recipe_title: str):
    return generate_image(recipe_title)

class GenRecipesWithImagesOutput(BaseModel):
    recipes_with_extra_ingredients: list[FormattedRecipeWithImage]
    recipes_with_limited_ingredients: list[FormattedRecipeWithImage]

class GenRecipesOutput(BaseModel):
    recipes_with_extra_ingredients: list[FormattedRecipe]
    recipes_with_limited_ingredients: list[FormattedRecipe]

@app.post("/recipes")
@cache(expire=EXPIRE, coder=JsonCoder)
async def gen_recipes(req: Request, b: RecipeBody) -> GenRecipesOutput:
    extra, limited = generate_recipes(b.ingredients, False)
    return GenRecipesOutput(recipes_with_extra_ingredients=extra, recipes_with_limited_ingredients=limited) # type: ignore

@app.post("/recipes_with_images")
@cache(expire=EXPIRE, coder=JsonCoder)
async def gen_recipes_with_images(req: Request, b: RecipeBody) -> GenRecipesWithImagesOutput:
    extra, limited = generate_recipes(b.ingredients, True)
    return GenRecipesWithImagesOutput(recipes_with_extra_ingredients=extra, recipes_with_limited_ingredients=limited) # type: ignore

@app.on_event("startup")
async def startup():
    redis = aioredis.from_url(os.environ["REDIS_URL"], encoding="utf8", decode_responses=True)
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache", key_builder=key_builder)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)