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
import time

load_dotenv() 

import boto3
import numpy as np, cv2

app = FastAPI()


@app.get("/")
def read_root():
    return {"status": "up"}


class RecipeBody(BaseModel):
    ingredients: list[str]

EXPIRE = 60*60*24

ingredients: list[str] = []

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
async def gen_recipes_with_images2(req: Request) -> GenRecipesWithImagesOutput:
    extra, limited = generate_recipes(ingredients, True)
    return GenRecipesWithImagesOutput(recipes_with_extra_ingredients=extra, recipes_with_limited_ingredients=limited) # type: ignore

@app.post("/recipes_with_images/reg")
@cache(expire=EXPIRE, coder=JsonCoder)
async def gen_recipes_with_images(req: Request, b: RecipeBody) -> GenRecipesWithImagesOutput:
    extra, limited = generate_recipes(b.ingredients, True)
    return GenRecipesWithImagesOutput(recipes_with_extra_ingredients=extra, recipes_with_limited_ingredients=limited) # type: ignore

@app.on_event("startup")
async def startup():
    redis = aioredis.from_url(os.environ["REDIS_URL"], encoding="utf8", decode_responses=True)
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache", key_builder=key_builder)

@app.get("/lol")
def hey():
    ENDPOINT_NAME = 'yolov5l-demo'
    # config = botocore.config.Config(read_timeout=80)
    # runtime = boto3.client('runtime.sagemaker', config=config)
    # runtime = boto3.Session().client('sagemaker')
    # runtime = boto3.client('runtime.sagemaker')
    runtime = boto3.client('sagemaker-runtime', region_name="us-east-1")
    
    modelHeight, modelWidth = 640, 640
    file_path = "/Users/json/Documents/src/jtheking/hackai2023athon/backend/1.png"
    orig_image = cv2.imread(file_path)
    out = None
    if orig_image is not None:
        start_time_iter = time.time()
        # pre-processing input image
        image = cv2.resize(orig_image.copy(), (modelWidth, modelHeight), interpolation = cv2.INTER_AREA)
        data = np.array(image.astype(np.float32)/255.)
        payload = json.dumps([data.tolist()])
        # write payload to a text file
        # run inference
        response = runtime.invoke_endpoint(EndpointName=ENDPOINT_NAME, ContentType='application/json', Body=payload)
        # get the output results
        out = json.loads(response['Body'].read().decode())
        end_time_iter = time.time()
        # get the total time taken for inference
        inference_time = round((end_time_iter - start_time_iter)*100)/100
    return out

@app.post("/set_ingredients")
def set_ingredients(i: list[str]):
    global ingredients
    ingredients = list(set(i))
    return ingredients

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)