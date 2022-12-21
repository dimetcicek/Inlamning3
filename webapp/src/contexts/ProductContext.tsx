import React, {useState, useContext, createContext} from 'react'
import { Product, ProductRequest} from '../models/ProductModel'
import { ProductProviderProps } from '../models/ProductProviderPropModel'

export interface IProductContext {
    product: Product
    productRequest: ProductRequest
    products: Product[]
    create: (e: React.FormEvent) => void
    get: (id: number) => void
    getAll: () => void
    update: (id: number, e: React.FormEvent) => void
    remove: (id: number) => void
}

export const ProductContext = createContext<IProductContext | null>(null)
export const useProductContext = () => { return useContext(ProductContext) }

const ProductProvider = ({children}: ProductProviderProps) => {
    const baseUrl = 'http://localhost:5000/api/products'
    const product_default: Product = {
        id: 0,
        name: '',
        category: '',
        price: 0,
        rating: 0,
        img: '',
        title: ''
    }
    const productRequest_default: ProductRequest = {
        name: '',
        category: '',
        price: 0,
        rating: 0,
        img: '',
        title: ''
    }

    const [product, setProduct] = useState<Product>(product_default)
    const [productRequest, setProductRequest] = useState<ProductRequest>(productRequest_default)
    const [products, setProducts] = useState<Product[]>([])

    const create = async (e: React.FormEvent) => {
        e.preventDefault()

        const result = await fetch(baseUrl, {
            method: 'post',
            headers: {
                'Content-Type':  'application/json'
            },
            body: JSON.stringify(productRequest)
        })

        if (result.status === 201)
            setProductRequest(productRequest_default)
    }

    const get = async (id: number) => {
        const result = await fetch(`${baseUrl}/${id}`)

        if (result.status === 200)
            setProduct(await result.json())
    }

    const getAll = async () => {
        const result = await fetch(baseUrl)

        if (result.status === 200)
            setProducts(await result.json())
    }

    const update = async (id: number, e: React.FormEvent) => {
        e.preventDefault()

        const result = await fetch(`${baseUrl}/${id}`, {
            method: 'put',
            headers: {
                'Content-Type':  'application/json'
            },
            body: JSON.stringify(product)
        })

        if (result.status === 200) {
            setProduct(await result.json())
        }
    }

    const remove = async (id: number) => {
        const result = await fetch(`${baseUrl}/${id}`, {
            method: 'delete'
        })

        if (result.status === 204) {
            setProduct(product_default)
        }
    }


    return (
        <ProductContext.Provider value={{ product, productRequest, products, create, get, getAll, update, remove }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider