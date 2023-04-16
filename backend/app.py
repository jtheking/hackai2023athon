from fastapi import FastAPI
from respell import *
from dotenv import load_dotenv

load_dotenv() 
app = FastAPI()


@app.get("/")
def read_root():
    return {"status": "up"}


class RecipeBody(BaseModel):
    ingredients: list[str]

@app.post("/image")
def gen_image(recipe_title: str):
    return generate_image(recipe_title)

class GenRecipesWithImagesOutput(BaseModel):
    recipes_with_extra_ingredients: list[FormattedRecipeWithImage]
    recipes_with_limited_ingredients: list[FormattedRecipeWithImage]

class GenRecipesOutput(BaseModel):
    recipes_with_extra_ingredients: list[FormattedRecipe]
    recipes_with_limited_ingredients: list[FormattedRecipe]

@app.post("/recipes")
def gen_recipes(body: RecipeBody) -> GenRecipesOutput:
    extra, limited = generate_recipes(body.ingredients, False)
    return GenRecipesOutput(recipes_with_extra_ingredients=extra, recipes_with_limited_ingredients=limited) # type: ignore

@app.post("/recipes_with_images")
def gen_recipes_with_images(body: RecipeBody) -> GenRecipesWithImagesOutput:
    extra, limited = generate_recipes(body.ingredients, True)
    return GenRecipesWithImagesOutput(recipes_with_extra_ingredients=extra, recipes_with_limited_ingredients=limited) # type: ignore