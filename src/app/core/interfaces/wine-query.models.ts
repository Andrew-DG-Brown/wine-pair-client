export interface SimpleResponse {
    pairedWines: Array<SimpleResItem>;
    dish: string;
    maxPrice: number | null;
    type: "simple";
}

interface SimpleResItem {
    foodquery: string;
    pairname: string;
    pairdescription: string;
    wine_name?: string;
    description?: string;
    image_url?: string;
    link?: string;
    id?: number;
}

export interface ComplexResponse {
    pairedWines: Array<ComplexPairedWine>;
    pairingText: string;
    productMatches: Array<ProductMatches>;
    dish: string;
    maxPrice: number | null;
    type: "complex";
}

interface ComplexPairedWine {
    wine_name: string;
    image_url: string;
    link: string;
    description: string
}

interface ProductMatches {
    id: number;
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    averageRating: number;
    ratingCount: number;
    score: number;
    link: string;
}

export interface FoodPair {
    wineData: WineDataInFood;
    text: string;
    pairings: Array<Pairings>;
}

interface WineDataInFood {
    wine_query_name: string;
    image_url: string;
    link: string;
}

interface Pairings {
    image: string;
    dish: string;
    recipes: string;
}

export interface ErrorRes { error: string, wine?: string, dish?: string }