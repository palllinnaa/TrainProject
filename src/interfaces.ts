export interface IPostsData {
    title: string;
    date: string;
    id: string;
    contentHtml?: string;
}

export interface IParams {
    params: { id: string };
}

export interface ICardData {
    image: string;
    bads: number;
    baths: number;
    title: string;
    price: string;
    reviewCount: number;
    rating: number;
}

// export type Product = {
//     id: number
//     productName: string
// }


export type Product = {
    id: number
    productName: string
    image: string
    // organic: boolean
    // vegan: boolean
    property: string[]
    price: number
    description: string
    reviewCount: number
    rating: number
    // cookingTime: string
    ingredients: string[]
}  