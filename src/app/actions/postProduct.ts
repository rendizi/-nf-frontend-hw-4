import {ProductInterface} from "@/app/actions/fetchProducts";
import {axiosProductsInstance} from "@/app/actions/apiClient";

const PostProducts = (data: ProductInterface) => {
    const resp = axiosProductsInstance.post('/products', data)
    return resp
}

export default PostProducts;