'use client'

import React, { FC, useState } from "react";
import '../(index)/globals.css'
import {axiosProductsInstance, axiosStorageInstance} from "@/app/actions/apiClient";
import {toast} from "react-toastify";
import {useQueryClient} from "react-query";

interface ProductFormProps {}

const ProductForm: FC<ProductFormProps> = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFiles] = useState<UploadedFiles[]>([])
    const queryClient = useQueryClient();

    const sendUploadReq = (data: UploadedFiles, formData: FormData) => {
        axiosStorageInstance.post<UploadResponse>('/files/upload', formData, {
            onUploadProgress: (progressEvent) => {
                const loaded = progressEvent.loaded;
                const total = progressEvent.total || data.totalBytes;
                setFiles(prev =>
                    prev.map(image =>
                        image.id === data.id ? { ...image, loadedBytes: loaded, totalBytes: total } : image
                    )
                );
            }
        }).then((response) => {
            if (response.data.location) {
                setImageLink(response.data.location);
            }
        }).catch((error) => {
            toast.error(error)
            console.log(error);
        });
    }

    const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event || !event.target || !event.target.files) return;
        const newFiles = Array.from(event.target.files).map(file => ({
            id: URL.createObjectURL(file),
            file: file,
            url: URL.createObjectURL(file),
            loadedBytes: 0,
            totalBytes: 0,
        }));

        setFiles(prev => [...prev, ...newFiles])

        newFiles.forEach(data => {
            const formData = new FormData()
            formData.append('file', data.file)
            sendUploadReq(data, formData)
        })
    };

    const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axiosProductsInstance.post('/products', {title, price, description, image: imageLink, category}).then((response) => {
            toast.success("Successfully added")
            queryClient.invalidateQueries('posts')
        }).catch((error) => toast.error(error))

    }

    return (
        <form className="max-w-md mx-auto text-white h-screen" onSubmit={submitHandle}>
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-black"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium">Price:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-black"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-black"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium">Image URL:</label>
                <input
                    type="file"
                    name="file"
                    onChange={uploadFile}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-black"
                />
                <div className="grid grid-cols-4 gap-2 mt-4">
                    {file && file.map((image,index) =>
                        <div key={index} className="relative">
                            <img src={image.id} className="w-full h-32 object-cover rounded-md"/>
                            <progress
                                className="progress progress-secondary"
                                value={image.loadedBytes}
                                max={image.totalBytes}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium">Category:</label>
                <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full bg-white text-black"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Submit
            </button>
        </form>
    );
};

export default ProductForm;

interface UploadedFiles{
    id: string,
    file: File ,
    loadedBytes: number,
    totalBytes: number
}

interface UploadResponse{
    originalname: string;
    filename: string;
    location: string ;
}