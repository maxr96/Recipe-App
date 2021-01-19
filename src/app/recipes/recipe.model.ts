import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    public category!: string;
    public time!: string;
    public author!: string;
    public createDate!: number;
    public updateDate!: number;

    constructor(public name: string, 
        public description: string, 
        public imagePath: string, 
        public ingredients: Ingredient[]) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}
