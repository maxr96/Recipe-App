import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f',{static: false}) shoppingListForm: NgForm;
  editingSubscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.editingSubscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editIndex > -1) {
        this.editMode = true;
        const index = stateData.editIndex;
        if(index > -1) {
          this.editedItem = stateData.ingredients[index];
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      } else {
        this.editMode = false;
      }
    })
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.unit, value.amount);
    if(this.editMode) {
      this.store.dispatch(ShoppingListActions.updateIngredient({ingredient: newIngredient}))
    } else {
      this.store.dispatch(ShoppingListActions.addIngredient({ingredient: newIngredient}));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
    this.store.dispatch(ShoppingListActions.stopEdit());
  }

  onDelete() {
    this.store.dispatch(ShoppingListActions.deleteIngredient());
    this.onClear();
    this.store.dispatch(ShoppingListActions.stopEdit());
  }

  ngOnDestroy() {
    this.editingSubscription.unsubscribe();
  }
}
