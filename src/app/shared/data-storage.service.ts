import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipes.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    private readonly SERVER_URL = '';
    constructor(private http: HttpClient, private recipeService: RecipeService){}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.SERVER_URL, recipes).subscribe(
            response => {
                console.log(response);
            }
        )
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(this.SERVER_URL)
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []};
            });
        }), tap(recipes => this.recipeService.setRecipes(recipes)))
    }
}