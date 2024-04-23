import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ReportService from '../services/Report';
import PrintableTable from './PrintTable';
import TeacherService from '../services/Teacher';

const ReportTeacherTable = () => {
    const [reports, setReports] = useState([]);
    const [showPrintableTable, setShowPrintableTable] = useState(false);
    const [professorId, setProfessorId] = useState('');
    const [professors, setProfessors] = useState([])

    const handlePrint = () => {
        setShowPrintableTable(true);
        setTimeout(() => {
            window.print();
            setShowPrintableTable(false);
        }, 500);
    };

    const fetchReports = async (filters = null) => {
        try {
            const response = await ReportService.getTeachers(filters); // Supondo que esse método retorna todas as classes
            setReports(response.data.results);
        } catch (error) {
            console.error('Erro ao buscar reports:', error);
        }
    };

    useEffect(() => {
        const fetchProfessors = async () => {
            try {
                const response = await TeacherService.getAll(); // Supondo que esse método retorna todas as classes
                setProfessors(response.data);
            } catch (error) {
                console.error('Erro ao buscar professores:', error);
            }
        };

        fetchProfessors();
    }, []);

    useEffect(() => {
        fetchReports();
    }, []);

    const handleChange = async (event) => {
        console.log(professorId);
        setProfessorId(event.target.value);
        await fetchReports({ professor_id: event.target.value })
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 100, maxWidth: 300 }}>
                <FormControl fullWidth margin="normal" required>
                    <InputLabel id="professor-label">Professor</InputLabel>
                    <Select
                        labelId="professor-label"
                        id="professorId"
                        name="professorId"
                        value={professorId}
                        label="Professor"
                        onChange={handleChange}
                    >
                        {professors.map((prof) => (
                            <MenuItem key={prof.id} value={prof.id}>
                                {prof.name} - {prof.code}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <TableContainer component={Paper} >
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
                                    Cadastro Prof.
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

                {showPrintableTable && <PrintableTable reports={reports} />}

            </TableContainer>
            <div style={{ justifyContent: 'flex-start', display: 'flex', padding: 10 }}>
                <Button variant="contained" color="primary" onClick={handlePrint} >
                    Imprimir
                </Button>
            </div>
        </>
    );
};

export default ReportTeacherTable;
