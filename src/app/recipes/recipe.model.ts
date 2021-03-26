import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public category!: string;
  public time!: string;
  public author!: string;
  public createDate!: number;
  public updateDate!: number;

  constructor(
    public title: string,
    public description: string,
    public instructions: string,
    public imagePath: string,
    public cuisine: string,
    public ingredients: Ingredient[]
  ) {
    this.title = title;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.cuisine = cuisine;
  }
}
