import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.actions';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.fetchRecipes),
      switchMap(() => {
        return this.http.get<Recipe[]>(environment.serverUrl + '/recipes');
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      }),
      map((recipes) => {
        return RecipesActions.setRecipes({ recipes });
      })
    )
  );

  storeRecipes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.storeRecipes),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([, recipesState]) => {
          return this.http.put(environment.serverUrl, recipesState.recipes);
        })
      ),
    { dispatch: false }
  );

  @Effect()
  postRecipe = this.actions$.pipe(
    ofType(RecipesActions.postRecipe),
    switchMap((action) => {
      return this.http.post<Recipe>(environment.serverUrl + '/recipes', action.recipe);
    })
  );
}
