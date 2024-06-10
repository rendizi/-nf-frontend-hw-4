import {useQuery} from "react-query";
import fetchProducts from "@/app/actions/fetchProducts";
import Product from "@/app/components/Product";

const ProductsList = () => {
    const {data, error, isLoading, isError} = useQuery('posts', fetchProducts)
    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }
    if (isError) {
        return <div>Error </div>
    }
    return (
        <div className="ml-3 mr-3 grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">               {data && data.map(product => (
                    <Product key={product.id} {...product} />
                ))}
        </div>
    )
}
export default ProductsList