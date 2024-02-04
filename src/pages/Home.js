import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from 'clsx';

import axios from "axios";
import {
    Grid,
    Modal,
    Box,
    TextField,
    Typography,
    AppBar,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ClassIcon from '@mui/icons-material/Class';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SchoolIcon from '@mui/icons-material/School';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { CREATEPOST, GETPOSTS } from "../services/ApiUrl";
import Card from "../Components/Card";
import { themes } from "../Helpers/Theme";
import GroupSelect from "../Components/Groups";
import MediaUploader from "../Components/MediaUploader";
import PropTypes from "prop-types";
import escolaIcone from '../assets/img/logo512.png';
import Navbar from "../Components/NavBar";
import CreateTeacherForm from "../Components/CreateTeacherForm";
import CreateStudentForm from "../Components/CreateStundentForm";
import { School } from "@mui/icons-material";
import CreateClassForm from "../Components/CreateClassForm";
import CreateSubjectForm from "../Components/CreateSubjectForm";

const drawerWidth = 240;

const Home = ({ window, isLogged, signUserOut }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState(null);

    // ... demais estados e lógica do Home

    const handleListItemClick = (component) => {
        setSelectedComponent(component);
    };

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <ListItem key={'registerTeacher'} disablePadding>
                        <ListItemButton onClick={() => {
                            handleListItemClick(null)
                            handleListItemClick('CreateTeacherForm')
                        }}>
                            <ListItemIcon>
                                <PersonAddAlt1Icon />
                            </ListItemIcon>
                            <ListItemText primary={'Cadastrar Professor'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'registerStudent'} disablePadding>
                        <ListItemButton onClick={() => {
                            handleListItemClick(null)
                            handleListItemClick('CreateStudentForm')
                        }}>
                            <ListItemIcon>
                                <SchoolIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Cadastrar Aluno'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'registerClass'} disablePadding>
                        <ListItemButton onClick={() => {
                            handleListItemClick(null)
                            handleListItemClick('CreateClassForm')
                        }}>
                            <ListItemIcon>
                                <ClassIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Cadastrar Sala de Aula'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'registerSubject'} disablePadding>
                        <ListItemButton onClick={() => {
                            handleListItemClick(null)
                            handleListItemClick('CreateSubjectForm')
                        }}>
                            <ListItemIcon>
                                <AutoStoriesIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Cadastrar Matéria'} />
                        </ListItemButton>
                    </ListItem>
                </div>
            </List >

        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    // const HomeStyles = makeStyles((theme) => ({
    //     root: {
    //         padding: "100px 50px",
    //         backgroundColor: themes.palette.primary.maindark,
    //         [theme.breakpoints.down("sm")]: {
    //             padding: "100px 10px",
    //         },
    //     },
    //     modalstyle: {
    //         position: "absolute",
    //         top: "50%",
    //         left: "50%",
    //         transform: "translate(-50%, -50%)",
    //         width: "70%",
    //         height: "90%",
    //         backgroundColor: themes.palette.primary.white,
    //         boxShadow: 24,
    //         padding: "20px 15px",
    //         overflowY: "scroll",
    //         scrollbarWidth: 'none', /* para navegadores Firefox */
    //         msOverflowStyle: 'none',
    //         '&::-webkit-scrollbar': { /* para navegadores Chrome, Safari, Opera */
    //             display: 'none',
    //         },
    //         [theme.breakpoints.down("sm")]: {
    //             width: "80%",
    //             height: "80%",
    //         },
    //     },
    //     textDiv: {
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItem: "center",
    //         justifyContent: "center",
    //         margin: "0 auto",
    //     },
    //     input: {
    //         margin: "0 auto",
    //         width: "100%",
    //         padding: "10px 20px",
    //     },
    //     spaceY: {
    //         padding: "16px 0",
    //     },
    //     buttonStyles: {
    //         backgroundColor: themes.palette.primary.darkbtn,
    //         borderRadius: "3px",
    //         color: themes.palette.primary.white,
    //         padding: "10px 18px",
    //         fontWeight: "600",
    //         fontSize: "16px",
    //         cursor: "pointer",
    //         border: "none",
    //         margin: "20px 0",
    //     },
    //     titleDiv: {
    //         display: "flex",
    //         alignItem: "center",
    //         justifyContent: "space-between",
    //         color: themes.palette.primary.white,
    //         padding: "0 14px",
    //     },
    //     text: {
    //         fontWeight: "bold",
    //         color: themes.palette.primary.offwhite,
    //         [theme.breakpoints.down("sm")]: {
    //             marginRight: 10,
    //         },
    //     },
    //     created: {
    //         backgroundColor: themes.palette.primary.darkbtn,
    //         position: "absolute",
    //         right: 5,
    //         top: 7,
    //         zIndex: 2,
    //         borderRadius: 6,
    //         padding: "10px 40px",
    //         animationDuration: "3s",
    //         animationName: "created",
    //     },
    //     "@keyframes created": {
    //         from: {
    //             marginLeft: "100%",
    //             width: "400%",
    //         },
    //         to: {
    //             marginLeft: "0%",
    //             width: "100%",
    //         },
    //     },
    // }));
    // const classes = HomeStyles();

    const HomeStyles = makeStyles((theme) => ({
        // ... outros estilos
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: 0,
            [theme.breakpoints.up('sm')]: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`, // Ajuste a largura para não ser sobreposta pelo Drawer
            },
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: drawerWidth,
        },
        // ... mais estilos se necessário
    }));

    const classes = HomeStyles();

    // ... demais lógica e efeitos do Home

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                    <Link to="/" className="logo">
                        <img src={escolaIcone} alt="Ícone Escola" className="escola-icone" />
                        <h3 className="text">Colegio Modelo - Administrativo</h3>
                    </Link>
                    <ul className="nav-list">
                        <li>
                            <Link to="/" className="navlink">Inicio</Link>
                        </li>
                        <li>
                            {!isLogged ? (
                                <Link to="/login" className="navlink">Login</Link>
                            ) : (
                                <button onClick={signUserOut} className="navlink">Sair</button>
                            )}
                        </li>
                    </ul>
                </div>

            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <main className={clsx(classes.content, {
                [classes.contentShift]: mobileOpen,
            })}>
                {/* Restante do seu componente Home */}
                {selectedComponent === 'CreateTeacherForm' && <CreateTeacherForm />}
                {selectedComponent === 'CreateStudentForm' && <CreateStudentForm />}
                {selectedComponent === 'CreateClassForm' && <CreateClassForm />}
                {selectedComponent === 'CreateSubjectForm' && <CreateSubjectForm />}
                {/* ... outros componentes que podem ser renderizados */}
            </main>
            {/* Restante do seu componente Home */}
        </Box>

    );
};

Home.propTypes = {
    // ... PropTypes, se necessário
};

export default Home;
