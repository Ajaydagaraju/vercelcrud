"use client"
import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

const initialData = {
    name: "",
    age: 0,
    email: "",
    phone: "",
    address: "",
    qualification: "",
    occupation: "",
    dob: "",
    linkedin: "",
    youTube: ""
}

const SignUp = () => {
    const [postalCode, setPostalCode] = useState("");
    const [postalData, setPostalData] = useState("");
    const [error, setError] = useState("");
    const [data, setData] = useState(initialData);


    const getaddress = (pincode) => {
        setPostalCode(pincode)
        if (pincode.length >= 6) {
            setTimeout(() => {
                fetch(`https://api.postalpincode.in/pincode/${pincode}`)
                    .then((res) => res.json())
                    .then((resData) => {
                        const status = resData[0]?.Status
                        if (status === "Success") {
                            const postalReqData = resData[0]?.PostOffice[0];
                            setPostalData(postalReqData);
                            setError('');
                        } else {
                            setError("Please enter a valid PinCode");
                            setPostalData("");
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }, 2000)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleFormSubmit = (e) => {
        console.log("submit button clicked")
        e.preventDefault();
        const payload = { data };
        fetch(`/api/signup`, {
            method: "POST",
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
                setData(initialData)
                console.log("REsponse data ", resposeData)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div style={{ width: "50%", margin: '0 auto' }} >

            <div style={{
                border: '1px solid black', borderRadius: '14px', padding: "10px", backgroundImage: `url("https://cdn.pixabay.com/photo/2017/04/05/04/44/background-2203989_1280.jpg")`,
                backgroundSize: 'cover', backgroundPosition: 'center', marginTop: '20px'
            }} >

                <div>
                    <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        type='text'
                        name='name'
                        value={data?.name}
                        placeholder='Enter you name!'
                        onChange={handleInputChange}
                        style={{ width: "100%", margin: '12px 0px' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        type='email'
                        name='email'
                        value={data?.email}
                        placeholder='Enter you Email!'
                        onChange={handleInputChange}
                        style={{ width: "100%", margin: '12px 0px' }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Age"
                        type="number"
                        name='age'
                        value={data?.age}
                        placeholder="Enter your Age!"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleInputChange}
                        style={{ width: "100%", margin: '12px 0px' }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Phone No."
                        type='number'
                        name='phone'
                        value={data?.phone}
                        placeholder="Enter your Phone No."
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleInputChange}
                        style={{ width: "100%", margin: '12px 0px' }}
                    />
                    <TextField
                        id="date"
                        label="Birthday"
                        type="date"
                        name="dob"
                        value={data?.dob}
                        defaultValue="XXXX-XX-XX"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleInputChange}
                        style={{ width: "100%", margin: '12px 0px' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Qualification"
                        variant="outlined"
                        type='text'
                        name='qualification'
                        value={data?.qualification}
                        placeholder='Enter you Qualification!'
                        onChange={handleInputChange}
                        style={{ width: "100%", margin: '12px 0px' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Occupation"
                        variant="outlined"
                        type='text'
                        name='occupation'
                        value={data?.occupation}
                        placeholder='Enter you Occupation!'
                        onChange={handleInputChange}
                        style={{ width: "100%", margin: '12px 0px' }}
                    />
                    <Typography variant='h5' >Address</Typography>
                    <TextField
                        id="outlined-basic"
                        label="Address Line 1"
                        variant="outlined"
                        type='text'
                        // value={text}
                        placeholder='Enter your address!'
                        // onChange={e => setText(e.target.value)}
                        style={{ width: "100%", margin: '12px 0px' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Address Line 2"
                        variant="outlined"
                        type='text'
                        // value={text}
                        placeholder='Enter your address!'
                        // onChange={e => setText(e.target.value)}
                        style={{ width: "100%", margin: '12px 0px' }}
                    />
                    <TextField
                        id="outlined-number"
                        label="PinCode"
                        type="number"
                        placeholder="Enter your PinCode!"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={postalCode}
                        onChange={e => getaddress(e.target.value)}
                        style={{ width: "100%", margin: '12px 0px' }}
                    />
                    {
                        error && <Typography style={{ color: 'red' }} variant='h5' >{error}</Typography>
                    }
                    <TextField
                        id="outlined-basic"
                        // label="City"
                        variant="outlined"
                        type='text'
                        value={postalData?.District || ""}
                        placeholder='Enter you City!'
                        // onChange={e => setText(e.target.value)}
                        style={{ width: "100%", margin: '12px 0px' }}
                    />
                    <TextField
                        id="outlined-basic"
                        // label="State"
                        variant="outlined"
                        type='text'
                        value={postalData?.State || ""}
                        placeholder='Enter you State!'
                        // onChange={e => setText(e.target.value)}
                        style={{ width: "100%", margin: '12px 0px' }}
                    />
                    <TextField
                        id="outlined-basic"
                        // label="Country"
                        variant="outlined"
                        type='text'
                        value={postalData?.Country || ""}
                        placeholder='Enter you Country!'
                        // onChange={e => setText(e.target.value)}
                        style={{ width: "100%", margin: '12px 0px' }}
                    />



                    <Typography variant='h5' >Social</Typography>
                    <TextField
                        id="outlined-basic"
                        label="Linked URL"
                        variant="outlined"
                        type='text'
                        name='linkedin'
                        value={data?.linkedin}
                        placeholder='Enter you Linked URL!'
                        onChange={handleInputChange}
                        style={{ width: "100%", margin: '12px 0px' }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="YouTube URL"
                        variant="outlined"
                        type='text'
                        name='youTube'
                        value={data?.youTube}
                        placeholder='Enter you YouTube URL!'
                        onChange={handleInputChange}
                        style={{ width: "100%", margin: '12px 0px' }}
                    />

                    <Button
                        style={{ width: "50%", margin: '12px 0px' }}
                        onClick={handleFormSubmit}
                        variant="contained">
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SignUp