"use client"
import React, { useEffect, useRef, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Review = (props) => {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [ref_product, setRefProduct] = useState("")
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState("")
    const refValue = useRef("");
    console.log("ref value", refValue)
    const getData = (e) => {
        const selectedValue = e.target.value;
        refValue.current = selectedValue
        setLoading(true)
        fetch(`/api/product/${selectedValue}/reviews`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false)
                refValue.current = selectedValue;
                setRefProduct('');
                setName('');
                setText("")
            })
            .catch((err) => {
                console.log(err)
                setLoading(false);
                refValue.current = ""
            })
    };

    const fetchData = () => {
        setLoading(true)
        fetch(`/api/product/${ref_product}/reviews`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false)
            })
    };



    const handleFormSubmit = (e) => {

        e.preventDefault();

        const payload = { name, text, ref_product };
        setLoading(true)
        const method = editMode ? "PUT" : "POST";
        const url = editMode ? `/api/product/${editId}/reviews` : `/api/product/${ref_product}/reviews`;

        fetch(url, {
            method,
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((resposeData) => {
                setLoading(false)
                setName('')
                setText('')
                setEditId(null)
                setRefProduct("")
                setEditMode(false);
                refValue.current = "";
                console.log("REsponse data ", resposeData)
                if (editMode) {
                    fetchData()
                } else {
                    setData(resposeData);
                }
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
            })
    }

    const handleEdit = (e) => {
        setName(e.name);
        setText(e.text);
        setRefProduct(e.ref_product);
        setEditMode(true);
        setEditId(e.id)
    }

    const handleDelete = (id) => {

        setLoading(true)
        fetch(`/api/product/${id}/reviews`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.message) {
                    setLoading(false)
                    setData((prevData) => prevData.filter((review) => review.id !== id));
                } else {
                    console.log('Error deleting review:', result.error);
                }
            })
            .catch((error) => {
                console.error('Error deleting review:', error);
            });
    }

    if (loading) {
        return (
            <div>
                <p>Loading reviews.....</p>
            </div>
        )
    };
    return (
        <div style={{ width: "50%", margin: '0 auto' }} >
            <FormControl fullWidth style={{ margin: '12px 0px' }}  >
                <InputLabel id="demo-simple-select-label">Select Review Reference</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={refValue.current}
                    label="Select Review Reference"
                    onChange={getData}
                >
                    <MenuItem value={""}>Select Option</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                </Select>
            </FormControl>
            <div>
                {
                    data?.length ? data.map((d) => {
                        return (
                            <div key={d?.id} style={{ border: '2px solid black', borderRadius: '14px', padding: '12px', margin: "10px", textAlign: "start", color: 'black', display: 'flex', justifyContent:'space-between', alignItems:'center' }} >
                                <div style={{}} >

                                    <p>Conected with : {d?.ref_product}</p>
                                    <h2>{d?.name}</h2>
                                    <p>{d?.text}</p>
                                </div>
                                <div style={{}} >
                                    <Stack direction="column" spacing={2}>
                                        <Button variant="outlined" color="success" onClick={() => handleEdit(d)}>
                                            Edit
                                        </Button>
                                        <Button variant="outlined" color="error" onClick={() => handleDelete(d.id)}>
                                            Delete
                                        </Button>
                                    </Stack>
                                </div>
                            </div>
                        )
                    })
                        :
                        <div style={{ border: '1px solid white', borderRadius: '14px', padding: '12px', color: 'white', backgroundColor: 'red', fontSize: '24px', margin: '12px 0px' }} >

                            <p>No Data To Show!</p>
                        </div>
                }
            </div>
            <div style={{
                border: '1px solid black', borderRadius: '14px', padding: "10px", backgroundImage: `url("https://cdn.pixabay.com/photo/2017/04/05/04/44/background-2203989_1280.jpg")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }} >
                <div style={{ border: '1px solid white', borderRadius: '14px', padding: '12px', color: editMode ? 'black' : 'white', backgroundColor: editMode ? "green" : 'blue', fontSize: '24px' }} >
                    <p> {editMode ? "Update The Data!" : "Add New Data!"}</p>
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        type='text'
                        value={name}
                        placeholder='Enter you name!'
                        onChange={e => setName(e.target.value)}
                        style={{ width: "100%", margin: '12px 0px' }}
                    />

                    <TextField
                        id="outlined-basic"
                        label="Review"
                        variant="outlined"
                        type='text'
                        value={text}
                        placeholder='Enter you text!'
                        onChange={e => setText(e.target.value)}
                        style={{ width: "100%", margin: '12px 0px' }}
                    />

                    <FormControl fullWidth style={{ width: "100%", marginTop: '12px' }} >
                        <InputLabel id="demo-simple-select-label">Select Review Reference</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ref_product}
                            label="Select Review Reference"
                            onChange={(e) => setRefProduct(e.target.value)}
                        >
                            <MenuItem value={""}>Select Option</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        style={{ width: "50%", margin: '12px 0px' }}
                        onClick={handleFormSubmit}
                        variant="contained">
                        {editMode ? "Update" : "Submit"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Review