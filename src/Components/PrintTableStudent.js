import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Divider } from '@mui/material';
import '../assets/css/printTable.css'

const PrintableTableStudent = ({ reports }) => {
    return (
        <div id="printableTable">
            <Typography component="div">
                <span style={{ fontWeight: 'bold' }}>Colégio Estadual Luiz Eduardo Magalhães</span>
            </Typography>
            <TableContainer style={{ marginTop: 20 }}>
                {reports.map((report, index) => (
                    <React.Fragment key={report.time_control_id}>
                        {index > 0 && <Divider style={{ margin: '20px 0' }} />}

                        <Typography variant="subtitle1" gutterBottom>
                            <strong>Dia:</strong> {report.day}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            <strong>Matéria:</strong> {report.subject_name}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            <strong>Professor:</strong> {report.teacher_name}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            <strong>Turma:</strong> {report.class_name}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            <strong>Aula Iniciou:</strong> {report.entry_datetime} | <strong>Terminou:</strong> {report.exit_datetime}
                        </Typography>
                        <Table size="small" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{
                                        borderRight: '1px solid #000',
                                        borderLeft: '1px solid #000', borderBottom: '1px solid #000', borderTop: '1px solid #000', width: '5%'
                                    }}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            <strong>n°</strong>
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{
                                        borderRight: '1px solid #000',
                                        borderLeft: '1px solid #000', borderBottom: '1px solid #000', borderTop: '1px solid #000', width: '60%'
                                    }}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            <strong>Nome</strong>
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{
                                        borderRight: '1px solid #000',
                                        borderLeft: '1px solid #000', borderBottom: '1px solid #000', borderTop: '1px solid #000', width: '15%'
                                    }}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            <strong>Dia</strong>
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{
                                        borderRight: '1px solid #000',
                                        borderLeft: '1px solid #000', borderBottom: '1px solid #000', borderTop: '1px solid #000', width: '5%'
                                    }}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            <strong>Presente</strong>
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{
                                        borderRight: '1px solid #000',
                                        borderLeft: '1px solid #000', borderBottom: '1px solid #000', borderTop: '1px solid #000', width: '5%'
                                    }}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            <strong>Faltou</strong>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {report.results.map((row, rowIndex) => (
                                    <TableRow key={row.attendance_id}>
                                        <TableCell style={{
                                            borderRight: '1px solid #000',
                                            borderLeft: '1px solid #000', borderBottom: '1px solid #000', borderTop: '1px solid #000'
                                        }}>{rowIndex + 1}</TableCell>
                                        <TableCell style={{
                                            borderRight: '1px solid #000',
                                            borderLeft: '1px solid #000', borderBottom: '1px solid #000', borderTop: '1px solid #000'
                                        }}>{row.student_name}</TableCell>
                                        <TableCell style={{
                                            borderRight: '1px solid #000',
                                            borderLeft: '1px solid #000', borderBottom: '1px solid #000', borderTop: '1px solid #000'
                                        }}>{row.attendance_date}</TableCell>
                                        <TableCell style={{
                                            borderRight: '1px solid #000',
                                            borderLeft: '1px solid #000', borderBottom: '1px solid #000', borderTop: '1px solid #000', textAlign: 'center'
                                        }}>{row.attendance_status === 'present' ? '✅' : ''}</TableCell>
                                        <TableCell style={{
                                            borderRight: '1px solid #000',
                                            borderLeft: '1px solid #000', borderBottom: '1px solid #000', borderTop: '1px solid #000', textAlign: 'center'
                                        }}>{row.attendance_status === 'absent' ? '❌' : ''}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </React.Fragment>
                ))}
            </TableContainer>
        </div>
    );
};

export default PrintableTableStudent;
