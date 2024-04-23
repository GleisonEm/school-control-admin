import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import '../assets/css/printTable.css'

const PrintableTable = ({ reports }) => {
    return (
        <div id="printableTable">
            <Typography component="div">
                <span style={{ fontWeight: 'bold' }}>Colégio Estadual Luiz Eduardo Magalhães</span>
            </Typography>
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell  >
                                <Typography variant="h6" gutterBottom>
                                    Professor
                                </Typography>
                            </TableCell>
                            <TableCell  >
                                <Typography variant="h6" gutterBottom>
                                    Cod. Professor
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="h6" gutterBottom>
                                    Matéria
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="h6" gutterBottom>
                                    Turma
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="h6" gutterBottom>
                                    Entrada
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="h6" gutterBottom>
                                    Saída
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="h6" gutterBottom>
                                    Total de horas
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reports.map((row) => (
                            <TableRow
                                key={row.entry_datetime}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.professor_name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.code_teacher}
                                </TableCell>
                                <TableCell align="right">{row.subject_name}</TableCell>
                                <TableCell align="right">{row.class_name}</TableCell>
                                <TableCell align="right">{row.entry_datetime}</TableCell>
                                <TableCell align="right">{row.exit_datetime}</TableCell>
                                <TableCell align="right">{row.total_hours_worked}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PrintableTable;
