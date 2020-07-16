import { Recipe } from './../recipe.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://www.ndtv.com/cooks/images/kerala.chicken.roast%20%281%29.jpg'),
    new Recipe('A Test Recipe 22', 'This is simply a test', 'https://www.ndtv.com/cooks/images/kerala.chicken.roast%20%281%29.jpg')
  ];
  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe){
    this.recipeSelected.emit(recipe);
  }
}
