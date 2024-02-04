import { Box, Modal, TextField, Typography } from "@mui/material"
import GroupSelect from "../Groups"
import { makeStyles, styled } from "@mui/styles";
import { useState } from "react";

const HomeStyles = makeStyles((theme) => ({
    root: {
        padding: "100px 50px",
        backgroundColor: themes.palette.primary.maindark,
        [theme.breakpoints.down("sm")]: {
            padding: "100px 10px",
        },
    },
    modalstyle: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "70%",
        height: "90%",
        backgroundColor: themes.palette.primary.white,
        boxShadow: 24,
        padding: "20px 15px",
        overflowY: "scroll",
        scrollbarWidth: 'none', /* para navegadores Firefox */
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': { /* para navegadores Chrome, Safari, Opera */
            display: 'none',
        },
        [theme.breakpoints.down("sm")]: {
            width: "80%",
            height: "80%",
        },
    },
    textDiv: {
        display: "flex",
        flexDirection: "column",
        alignItem: "center",
        justifyContent: "center",
        margin: "0 auto",
    },
    input: {
        margin: "0 auto",
        width: "100%",
        padding: "10px 20px",
    },
    spaceY: {
        padding: "16px 0",
    },
    buttonStyles: {
        backgroundColor: themes.palette.primary.darkbtn,
        borderRadius: "3px",
        color: themes.palette.primary.white,
        padding: "10px 18px",
        fontWeight: "600",
        fontSize: "16px",
        cursor: "pointer",
        border: "none",
        margin: "20px 0",
    },
    titleDiv: {
        display: "flex",
        alignItem: "center",
        justifyContent: "space-between",
        color: themes.palette.primary.white,
        padding: "0 14px",
    },
    text: {
        fontWeight: "bold",
        color: themes.palette.primary.offwhite,
        [theme.breakpoints.down("sm")]: {
            marginRight: 10,
        },
    },
    created: {
        backgroundColor: themes.palette.primary.darkbtn,
        position: "absolute",
        right: 5,
        top: 7,
        zIndex: 2,
        borderRadius: 6,
        padding: "10px 40px",
        animationDuration: "3s",
        animationName: "created",
    },
    "@keyframes created": {
        from: {
            marginLeft: "100%",
            width: "400%",
        },
        to: {
            marginLeft: "0%",
            width: "100%",
        },
    },
}));
const classes = HomeStyles();

export const CreateModal = ({ isLogged, signUserOut }) => {
    const [open, setOpen] = useState(false);
    return (
        <Modal open={open} onClose={handleClose}>
            <Box className={classes.modalstyle}>
                <div className={classes.textDiv}>
                    <GroupSelect />

                    <Typography className={classes.spaceY} variant="h5">
                        Título
                    </Typography>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        className={classes.input}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Typography className={classes.spaceY} variant="h5">
                        Conteúdo
                    </Typography>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={10}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="write a post..."
                        className={classes.input}
                    />
                    <>
                        <Typography className={classes.spaceY} variant="h5">
                            Anexo de Mídias
                        </Typography>
                    </>

                </div>
                <div>
                    <button
                        type="submit"
                        variant="contained"
                        className={classes.buttonStyles}
                        onClick={newPost}
                    >
                        Create Post
                    </button>
                </div>
            </Box>
        </Modal>
    )
}