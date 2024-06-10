import {ProductInterface} from "@/app/actions/fetchProducts";

const Product = ({id, title, price, category, description,image}:ProductInterface) => {
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={image} alt={title}
                         className="rounded-xl"/>
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{title}</h2>
                    <div className="card-actions">
                        <button className="btn btn-primary" onClick={()=>{
                            (document.getElementById(`${id}`) as HTMLDialogElement).showModal()
                            }}>View more</button>
                    </div>
                </div>
            </div>
            <dialog id={`${id}`} className="modal">
                <div className="modal-box">
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img src={image} alt={title}
                                 className="rounded-xl"/>
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{title}</h2>
                            <div className="badge badge-primary">{category}</div>
                            <p>{description}</p>
                            <div className="card-actions">
                                <button className="btn btn-primary">Buy for {price}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default Product