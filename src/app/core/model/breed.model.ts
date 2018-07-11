export interface Breed {
    id: string;
    name: string;
}

export interface BreedScore {
    breed: Breed;
    score: number;
}