import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 
        'This is simply a test', 
        'https://www.ndtv.com/cooks/images/kerala.chicken.roast%20%281%29.jpg',
        [
            new Ingredient('Meat', 1),
            new Ingredient('Potato', 5)
        ]),
        new Recipe('A Test Recipe 22', 
        'This is simply a test', 
        'https://www.ndtv.com/cooks/images/kerala.chicken.roast%20%281%29.jpg',
        [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
        ]
        )
      ];
      getRecipes() {
          return this.recipes.slice();
      }
}