"use client"
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation';


export default function BasicTable() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true)
    fetch(`/api/signup`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setData(data);
      })
  }, [])

  const handleDelete = (id) => {
    setLoading(true)
    fetch(`/api/signup/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false)
        if (result.message) {
          setData((prevData) => prevData.filter((SignUpData) => SignUpData.id !== id));
        } else {
          console.log('Error deleting SignUpData:', result.error);
        }
      })
      .catch((error) => {
        setLoading(false)
        console.error('Error deleting SignUpData:', error);
      });
  }

  const handleEdit = (e) => {
    router.push(`/signup?isEdit=true&editId=${e.id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone Number</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Date of Birth</TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Qualification</TableCell>
            <TableCell align="center">Occupation</TableCell>
            <TableCell align="center">LinkedIn</TableCell>
            <TableCell align="center">YouTube</TableCell>
            <TableCell align="center">Action</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.length && !loading ? data.map((row) => (
            <TableRow
              key={row.id}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.name || "-"}</TableCell>
              <TableCell align="center">{row.email || "-"}</TableCell>
              <TableCell align="center">{row.phone || "-"}</TableCell>
              <TableCell align="center">{row.age || "-"}</TableCell>
              <TableCell align="center">{new Date(row.dob).toISOString().split('T')[0] || "-"}</TableCell>
              <TableCell align="center">{row.address || "-"}</TableCell>
              <TableCell align="center">{row.qualification || "-"}</TableCell>
              <TableCell align="center">{row.occupation || "-"}</TableCell>
              <TableCell align="center">{row.linkedin || "-"}</TableCell>
              <TableCell align="center">{row.youtube || "-"}</TableCell>
              <TableCell align="center">
                <Stack direction="row" spacing={1}>
                  <IconButton aria-label="delete" >
                    <EditIcon onClick={() => handleEdit(row)} />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))
            : (<TableRow>
              <TableCell colSpan={11} align="center">
                {loading ? <Typography>Loading Signup Details....</Typography> : <Typography> No Data Available!</Typography>}
              </TableCell>
            </TableRow>

            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
