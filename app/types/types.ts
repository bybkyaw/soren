'use server';

export interface Book {
    id: number; // or string, depending on your data structure
    name: string;
    price: number;
    image: string;
    rating: number;
}
