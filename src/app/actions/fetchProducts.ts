import {axiosProductsInstance} from "@/app/actions/apiClient";

const fetchProducts = async ():Promise<ProductInterface[]> => {
    const {data} = await axiosProductsInstance.get<ProductInterface[]>('/products');
    return data;
}

export interface ProductInterface{
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
}

export default fetchProducts