import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, FormControl, InputLabel, Select, MenuItem, Divider } from '@mui/material';
import * as dayjs from 'dayjs'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ptBR } from '@mui/x-date-pickers/locales';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ReportService from '../services/Report';
import StudentService from '../services/Student';
import PrintableTableStudent from './PrintTableStudent';
import TeacherService from '../services/Teacher';
import ptBr from 'dayjs/locale/pt-br';
import EmptyTableMessage from './EmptyResults';

const ReportStudentTable = () => {
    const [reports, setReports] = useState([]);
    const [showPrintableTable, setShowPrintableTable] = useState(false);
    const [teacherId, setTeacherId] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [filters, setFilters] = useState([]);
    const [dateValue, setDateValue] = useState(null);

    const handlePrint = () => {
        setShowPrintableTable(true);
        setTimeout(() => {
            window.print();
            setShowPrintableTable(false);
        }, 500);
    };

    const fetchReports = async (filters = null) => {
        try {
            const response = await ReportService.getStudents(filters);
            setReports(response.data.results);
        } catch (error) {
            console.error('Erro ao buscar reports:', error);
        }
    };

    useEffect(() => {
        const fetchProfessors = async () => {
            try {
                const response = await TeacherService.getAll(); // Supondo que esse método retorna todas as classes
                setTeachers(response.data);
            } catch (error) {
                console.error('Erro ao buscar professores:', error);
            }
        };

        fetchProfessors();
    }, []);

    useEffect(() => {
        // Ao mudar a data selecionada, atualizar os registros com a nova
        if (dateValue !== null) {
            console.log('Novo ano:', dateValue.$y);
            console.log('Novo mês:', dateValue.$M);
            console.log('Novo dia:', dateValue.$D);
            console.log("dateValue", dayjs(dateValue))
            let filtersValue = { ...filters, date: dayjs(dateValue).format('YYYY-MM-DD') }
            setFilters(filtersValue)
            fetchReports(filtersValue);
        }
        // Formatar a data para o formato 'YYYY-MM-DD'
    }, [dateValue]); // Adicionar selectedDate como dependência para que a busca seja disparada ao alterar a data

    const handleChange = async (event) => {
        let filtersValue = { ...filters, teacher_id: event.target.value }
        setTeacherId(event.target.value)
        setFilters(filtersValue)
        await fetchReports(filtersValue);
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', marginTop: 90, }}>
                <FormControl fullWidth margin="normal" style={{ maxWidth: 300, marginRight: 10 }} required>
                    <InputLabel id="teacher-label">Professor</InputLabel>
                    <Select
                        labelId="teacher-label"
                        id="teacherId"
                        name="teacherId"
                        value={teacherId}
                        label="Professor"
                        onChange={handleChange}
                    >
                        {teachers.map((prof) => (
                            <MenuItem key={prof.id} value={prof.id}>
                                {prof.name} - {prof.code}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale={ptBr}
                    localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label={"Escolha o dia"}
                            localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
                            format="DD/MM/YYYY" value={dateValue}
                            onChange={(newValue) => setDateValue(newValue)} />
                    </DemoContainer>
                </LocalizationProvider>
            </div>
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
                {reports.length === 0 && <EmptyTableMessage message={"Nenhum registro encontrado para esse dia"} />}
                {showPrintableTable && <PrintableTableStudent reports={reports} />}
            </TableContainer>
            <div style={{ justifyContent: 'flex-start', display: 'flex', padding: 10 }}>
                <Button variant="contained" color="primary" onClick={handlePrint}>
                    Imprimir
                </Button>
            </div>
        </>
    );
};

export default ReportStudentTable;
