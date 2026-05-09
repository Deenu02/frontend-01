import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function AddProductPage(){

const [productId, setProductId] = useState("");
const [name, setName] = useState("");
const [altNames, setAltNames] = useState("");
const [images, setImages] = useState([]);
const [labelledPrice, setLabelledPrice] = useState(0);
const [price, setPrice] = useState(0);
const [stock, setStock] = useState(0);
const [description, setDescription] = useState("");
const navigate = useNavigate();

async function addProduct(){

    const token = localStorage.getItem("token")
    if(token == null){
        toast.error("Please login first")
        return
    }

    if(images.length<=0){
        toast.error("Please select at least one image")
        return
    }

    const promisesArray = []

    for(let i=0;i<images.length;i++){
        promisesArray[i] = mediaUpload(images[i])
    }

    try{
        const imageUrls = await Promise.all(promisesArray)
        console.log(imageUrls)

        const altNamesArray = altNames.split(",")

        const product = {
            productId : productId,
            name : name,
            altNames : altNamesArray,
            images : imageUrls,
            labelledPrice : labelledPrice,
            price : price,
            stock : stock,
            description : description
        }
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/products", product,{
            headers : {
                Authorization : "Bearer "+token
            }
        }).then((res)=>{
            toast.success("Product added successfully")
            navigate("/admin/products")
        }).catch((e)=>{
            toast.error(e.response.data.message)
        })

    }catch(e){
        console.log(e);
    }
}
    


    return(
        <div className="w-full h-full flex flex-col justify-center items-center">
            <input type="text" placeholder="Product ID" value={productId} onChange={(e)=>setProductId(e.target.value)} className="border border-gray-300 rounded p-2 mb-4 w-[300px]"/>
            <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} className="border border-gray-300 rounded p-2 mb-4 w-[300px]"/>
            <input type="text" placeholder="Alternative Names (comma separated)" value={altNames} onChange={(e)=>setAltNames(e.target.value)} className="border border-gray-300 rounded p-2 mb-4 w-[300px]"/>
            <input type="file" multiple onChange={(e)=>setImages(Array.from(e.target.files))} className="border border-gray-300 rounded p-2 mb-4 w-[300px]"/>
            <input type="number" placeholder="Labelled Price" value={labelledPrice} onChange={(e)=>setLabelledPrice(e.target.value)} className="border border-gray-300 rounded p-2 mb-4 w-[300px]"/>
            <input type="number" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)} className="border border-gray-300 rounded p-2 mb-4 w-[300px]"/>
            <input type="number" placeholder="Stock" value={stock} onChange={(e)=>setStock(e.target.value)} className="border border-gray-300 rounded p-2 mb-4 w-[300px]"/>
            <textarea placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} className="border border-gray-300 rounded p-2 mb-4 w-[300px] h-[100px]"/>
            <div className="w-full flex justify-centerflex-row items-center mt-4">
                <Link to="/admin/products" className="bg-gray-500 text-white font-bold py-2 px-4 rounded mr-4">Cancel</Link>   
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded cursor-pointer" onClick={addProduct}>Add Product</button>
            </div>
        </div>
    )
}