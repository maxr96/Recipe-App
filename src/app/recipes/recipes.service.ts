import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer";

@Injectable({providedIn: 'root'})
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];
    // private recipes: Recipe[] = [
    //     new Recipe('A Test Recipe', 
    //     'This is simply a test', 
    //     'https://www.ndtv.com/cooks/images/kerala.chicken.roast%20%281%29.jpg',
    //     [
    //         new Ingredient('Meat', 1),
    //         new Ingredient('Potato', 5)
    //     ]),
    //     new Recipe('A Test Recipe 22', 
    //     'This is simply a test', 
    //     'https://www.ndtv.com/cooks/images/kerala.chicken.roast%20%281%29.jpg',
    //     [
    //         new Ingredient('Buns', 2),
    //         new Ingredient('Meat', 1)
    //     ]
    //     )
    //   ];

      constructor(private store: Store<fromShoppingList.AppState>){}

      setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes() {
          return this.recipes.slice();
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
      }

      getRecipe(id: number) {
          return this.recipes[id];
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
          this.recipes.splice(index, 1);
         this.recipesChanged.next(this.recipes.slice()); 
      }
}