import React, { useState, useEffect } from 'react';
import Loader from "./Loader";
import axios from "axios";
import "../Styles/generic.css";

const Form = (props) => {
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [costPrice, setCostPrice] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        setProductName(props.productName || "");
        setQuantity(props.quantity || 0);
        setCostPrice(props.costPrice || 0);
        setSellingPrice(props.sellingPrice || 0);
    }, []);

    function onSubmit(event) {
        if (costPrice > sellingPrice) {
            alert("Selling Price should be greater than equal to Cost Price");
        }
        else {
            if (props._id) {
                // update Call for given mongoDb id
                setShowLoader(true);
                fetch(`http://localhost:8081/api/product/${props._id}`, { 
                    method: "PUT", 
                    body: JSON.stringify({
                        "productName": productName,
                        "quantity": quantity,
                        "costPrice": costPrice,
                        "sellingPrice": sellingPrice
                    }),  
                    headers: { 
                        "Content-type": "application/json; charset=UTF-8"
                    } 
                }).then((data) => {
                    setShowLoader(false);
                    props.onEditSuccess();
                }, (error) => {
                    console.log(error);
                    setShowLoader(false);
                });
            }
            else {
                axios.post(`http://localhost:8081/api/product`, {
                    "productName": productName,
                    "quantity": quantity,
                    "costPrice": costPrice,
                    "sellingPrice": sellingPrice
                }, {
                    headers: { 
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }).then((data) => {
                    setShowLoader(false);
                    props.onEditSuccess();
                }, (error) => {
                    console.log(error);
                    setShowLoader(false);
                });
            }
        }
    }

    return <div className={["margin-10px"]}>
        { showLoader ? <Loader>
            Loading...
        </Loader> : false}
       <h1>{props._id ? "Update Product Details" : "Create Product Entry"}</h1> 
        <form>
            {!new RegExp(/^[0-9A-Za-z\s]*[0-9A-Za-z]+[0-9A-Za-z\s]*$/g).test(productName.trim()) && productName.length > 0 && <div className={["error"]}>
                Product Name should only contain Alphanumeric Character.
            </div>}
            <div className={["form-group"]}>
                <label htmlFor="quantity">Product Name:</label>
                <input required pattern="[a-zA-Z0-9\s]+" type="text" placeholder="Enter Product Name" className={["form-control"]} disabled={props._id} id="productName" value={productName} name="productName" onChange={(e) => setProductName(e.target.value)} />
            </div>
            <div className={["form-group"]}>
                <label htmlFor="quantity">Quantity:</label>
                <input required type="number" className={["form-control"]} id="quantity" value={quantity} name="quantity" onChange={(e) => setQuantity(e.target.value)} />
            </div>
            <div className={["form-group"]}>
                <label htmlFor="cp">Cost Price:</label>
                <input required type="number" className={["form-control"]} id="costPrice" disabled={props._id} value={costPrice} name="cp" onChange={(e) => setCostPrice(e.target.value)} />
            </div>
            <div className={["form-group"]}>
                <label htmlFor="sp">Selling Price:</label>
                <input required type="number" className={["form-control"]} id="sellPrice" value={sellingPrice} name="sp" onChange={(e) => setSellingPrice(e.target.value)}/>
            </div>
            <button type="button" className={["btn btn-primary"]} disabled={!new RegExp(/^[0-9A-Za-z\s]*[0-9A-Za-z]+[0-9A-Za-z\s]*$/g).test(productName.trim()) && productName.length > 0} onClick={onSubmit}>{props._id ? "Update" : "Create"}</button> &nbsp;
            <button type="button" className={["btn btn-secondary"]} onClick={() => props.onEditSuccess()}>Cancel</button>
        </form>
    </div>
}
export default Form;