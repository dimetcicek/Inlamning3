export interface Product {
    id: number
    name: string
    category: string
    price: number
    rating: number
    img: string
    title: string
}

export interface ProductRequest {
    name: string
    category: string
    price: number
    rating: number
    img: string
    title: string
}