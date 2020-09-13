import React from "react";
import List from "./List";
import Form from "./Form";
import { useState } from "react";

const Home = () => {
    const [showForm, setShowForm] = useState(false);
    const [showList, setShowList] = useState(true);
    const [EditInfo, setEditInfo] = useState({});
    const [editMode, setEditMode] = useState(false);

    const onCreateButtonClick = () => {
        setEditMode(false);
        setShowForm(true);
        setShowList(false);
    }

    function onEditSuccess() {
        setShowForm(false);
        setShowList(true);
        setEditMode(false);
    }

    const onEditClick = (product) => {
        setEditInfo({...product});
        setEditMode(true);
        setShowForm(true);
        setShowList(false);
    }

    return <div className={["container"]}>
        <div>
            {showList ? <div>
                <input type="button" onClick={onCreateButtonClick} value="Create Product" />
            </div> : false}
            {showForm && editMode ? <Form {...EditInfo} onEditSuccess={onEditSuccess} /> :
                showForm && !editMode ? <Form onEditSuccess={onEditSuccess} /> :
                false
            }
            {showList ? <List onEdit = {onEditClick} /> : false}
        </div>
    </div>
}

export default Home;