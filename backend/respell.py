from uuid import uuid4
from pydantic import BaseModel
import requests
import json
import os

prompt_base = "I want you to act as a chef with expertise in cooking and menu preparation. I will give you a list of ingredients that I currently have. Non-perishable items, such as pasta, rice, or condiments like salt and pepper, are always available."

prompt_suffix = " Break each recipe down into steps that can be easily followed by an inexperienced chef. Focus on the flavors and textures of the ingredients, and provide step-by-step instructions for each recipe. The first line of each recipe should be the title of the recipe. The second line should be a comma delimited list of ingredients, with no spaces. Do not use multiple lines to list out the ingredients. All subsequent lines should consist of the steps for the recipe. Do not include any section headings. Separate each recipe with 3 dashes."

propmt_use_limited_ingredients = prompt_base + " Create 6 original recipes, using only the ingredients I currently have. Do not include any extra ingredients in the recipes." + prompt_suffix

prompt_use_extra_ingredients = prompt_base + "Create 6 original recipes, which include some or all of the ingredients I currently have. Let the recipes be flavorful and delicious, using herbs, spices, and other additives to enhance the recipes. Feel free to be creative and include ingredients I do not have in the list." + prompt_suffix

def generate_image(recipe_title: str) -> str:
    response = requests.post(
        "https://api.respell.ai/v1/run",
        headers={
            'Authorization': f'Bearer {os.environ["RESPELL_API_KEY"]}',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data=json.dumps({
            "spellId": "jicJjmg1gcix7TSMGsZtl",
            "inputs": {
                "recipe_title": recipe_title,
            }
        }),
    )

    out = RawImageOutput.parse_obj(response.json())
    return out.outputs.kandinsky

class RawImageOutput(BaseModel):
    class RawImage(BaseModel):
        kandinsky: str

    outputs: RawImage


def generate_recipes(ingredients: list[str], include_images = False):
    response = requests.post(
        "https://api.respell.ai/v1/run",
        headers={
            'Authorization': f'Bearer {os.environ["RESPELL_API_KEY"]}',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data=json.dumps({
            "spellId": "1wBqSJ2w_Kl19TZJLFM1s",
            "inputs": {
                "new_line_delimited_list_of_ingredients": "\n".join(ingredients),
                "prompt_use_limited_ingredients": propmt_use_limited_ingredients,
                "prompt_use_extra_ingredients": prompt_use_extra_ingredients
            }
        }),
    )

    out = _parse_raw_recipes(RawRecipeOutput.parse_obj(response.json()))
    if not include_images:
        return out
    
    extra, current = out
    extra_with_images: list[FormattedRecipeWithImage] = []
    current_with_images: list[FormattedRecipeWithImage] = []
    for recipe in extra:
        extra_with_images.append(FormattedRecipeWithImage(id=recipe.id, title=recipe.title, ingredients=recipe.ingredients, instructions=recipe.instructions, image_url=generate_image(recipe.title)))
    for recipe in current:
        current_with_images.append(FormattedRecipeWithImage(id=recipe.id, title=recipe.title, ingredients=recipe.ingredients, instructions=recipe.instructions, image_url=generate_image(recipe.title)))

    return tuple([extra_with_images, current_with_images])


class RawRecipeOutput(BaseModel):
    class RawRecipes(BaseModel):
        recipes_with_extra_ingredients: str
        recipes_with_current_ingredients: str

    outputs: RawRecipes

class FormattedRecipe(BaseModel):
    id: str
    ingredients: list[str]
    instructions: list[str]
    title: str


class FormattedRecipeWithImage(FormattedRecipe):
    image_url: str

def _raw_recipe_to_formatted(raw_recipe: str) -> FormattedRecipe:
    split = raw_recipe.strip().split("\n")
    print(split)
    title = split[0].split(":")[-1].strip()
    print(split)
    ingredients = split[1].strip().split(",")
    steps = split[2:]
    return FormattedRecipe(title=title, ingredients=ingredients, instructions=steps, id=str(uuid4()))

def _parse_raw_recipes(raw_recipe: RawRecipeOutput) -> tuple[list[FormattedRecipe], list[FormattedRecipe]]:
    recipes_with_extra_ingredients: list[FormattedRecipe] = []
    recipes_with_current_ingredients: list[FormattedRecipe] = []

    for recipe in raw_recipe.outputs.recipes_with_extra_ingredients.split("---"):
        if len(recipe.strip().split("\n")) < 3:
            continue
        recipes_with_extra_ingredients.append(_raw_recipe_to_formatted(recipe))

    for recipe in raw_recipe.outputs.recipes_with_current_ingredients.split("---"):
        if len(recipe.strip().split("\n")) < 3:
            continue
        recipes_with_current_ingredients.append(_raw_recipe_to_formatted(recipe))

    return tuple([recipes_with_extra_ingredients, recipes_with_current_ingredients])
