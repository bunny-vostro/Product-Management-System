import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const List = (props) => {
    const [products, setProducts] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        setShowLoader(true);
        let url = "http://localhost:8081/api/products";
        if (searchText !== "")
            url += "?productName="+ searchText;
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
        }).then(response => response.json()).then((data) => {
            setProducts([...data]);
            setShowLoader(false);
        }, err => {
            setProducts([]);
            setShowLoader(false);
        });
    }, [searchText]);

    function onDelete(id, index) {
        setShowLoader(true);
        axios.delete(`http://localhost:8081/api/product/${id}`).then(() => {
            const newList = [...products];
            newList.splice(index,1);
            setProducts(newList);
            setShowLoader(false);
        }, () => {
            setShowLoader(false);
        });
    }

    const searchSuggestion = (text) => {
        setSearchText(text);
    }

    return <div>
        {showLoader ? <Loader>Loading...</Loader> : false}

        <Autocomplete
            freeSolo
            disableClearable
            onChange={(e, newval) => {
                searchSuggestion(newval);
            }}
            onKeyUp={(e) => {
                if (e.keyCode === 13)
                    searchSuggestion("");
            }}
            options={products.map((option) => option.productName)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search Product"
                    margin="normal"
                    onKeyDown={e => {
                        if (e.keyCode === 13 && e.target.value) {
                            searchSuggestion(searchText.concat(e.target.value));
                        }
                    }}
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: 'search' }}
                />
            )}
        />
        <table className={["table table-striped"]}>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>quantity</th>
                    <th>Cost Price</th>
                    <th>Selling Price</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products ? products.map((product, index) => <tr key={index}>
                    <td>{product.productName}</td>
                    <td>{product.quantity}</td>
                    <td>{product.costPrice}</td>
                    <td>{product.sellingPrice}</td>
                    <td><input type="button" className={["btn btn-primary"]} onClick={() => props.onEdit(product)} value="Edit" /></td>
                    <td><input type="button" className={["btn btn-secondary"]} onClick={() => onDelete(product._id, index)} value="Delete" /></td>
                  </tr>) : false}
            </tbody>
        </table>
    </div>
}

export default List;