import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipe.actions';
import { environment } from '../../../environments/environment';

@Injectable()
export class RecipeEffects {
  constructor(private actions$: Actions, private http: HttpClient) {
  }
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(fetchAction => {
      return this.http.get<Recipe[]>(environment.serverUrl)
    }),
    map(recipes => {
      return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []};
      })}),
    map(recipes => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );
}