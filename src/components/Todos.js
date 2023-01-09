import { useState, useEffect } from "react";
import {
        Card,
        CardContent,
        Typography,
        Chip,
        Checkbox,
        Grid,
        Button,
        TextField,
        MenuItem,
        Divider
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useAuthUser } from 'react-auth-kit'
const Todos = ({ task, filter }) => {
        // console.log('Todosfilter',filter )
        const auth = useAuthUser()
        // console.log(task);
        const styles = {
                card: {
                        margin: "3rem 0",
                        minWidth: "75%",
                },
                header: {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "2rem",
                        marginBottom: "2rem",
                },
                checkbox: {
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                },
                content: {
                        display: "flex",
                        justifyContent: "flex-start",
                        marginLeft: "2.5rem",
                },
                btn: {
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: ".5rem",
                },
        };


        const [checked, setChecked] = useState(task?.isComplete);
        const [open, setOpen] = useState(false);
        const [deadline, setDeadline] = useState(task?.date);
        const [title, setTitle] = useState(task?.title);
        const [description, setDescription] = useState(task?.description);
        const [priority, setPriority] = useState(task?.priority);
        const [openEdit, setOpenEdit] = useState(false);



        let today = new Date();

        const handleChangeCheck = (event) => {
                setChecked(event.target.checked);
        };

        const handleClickOpen = () => {
                setOpen(true);
        };

        const handleClose = () => {
                setOpen(false);
        };
        const handleClickOpenEdit = () => {
                setOpenEdit(true);
        };

        const handleCloseEdit = () => {
                setOpenEdit(false);
        };

        const deleteTask = async (id) => {
                const config = {
                        headers: {
                                Authorization: `Bearer ${auth().token} `,
                                "ngrok-skip-browser-warning": "any",
                        },
                };
                try {
                        console.log("deleteTask", id);
                        const res = await axios
                                .delete(`${process.env.REACT_APP_API_URL}api/todo/${id}`, config)
                        handleClose();
                } catch (err) {
                        alert("Error: " + err.message);
                }

        };

        const updateTask = async (id) => {
                console.log("update", id);
                if (title === "") {
                        toast.error("Please enter a title");
                        return;
                } else if (description === "") {
                        toast.error("Please enter a description");
                        return;
                } else if (priority === "") {
                        toast.error("Please select a priority");
                        return;
                } else if (deadline === "") {
                        toast.error("Please select a deadline");
                        return;
                } else if (deadline < today) {
                        toast.error("Please select deadline at least one day above current date");
                        return;
                } else {
                        console.log("To do data added succesfully");
                        let task = { title, description, priority };
                        console.log(task);
                        try {
                                const config = {
                                        headers: {
                                                'Authorization': `Bearer ${auth().token} `,
                                                'ngrok-skip-browser-warning': 'any'
                                        }
                                }
                                const res = await axios
                                        .put(`${process.env.REACT_APP_API_URL}api/todo/${id}`, task, config)
                                console.log(res);
                                toast.success("Task updated successfully");
                                handleCloseEdit();
                        } catch (err) {
                                alert(err.message);
                        }



                }
        }

        const completeTask = async (id) => {
                console.log(!checked)
                let isComplete = !checked
                let task = { isComplete };
                console.log(task);
                try {
                        const config = {
                                headers: {
                                        'Authorization': `Bearer ${auth().token} `,
                                        'ngrok-skip-browser-warning': 'any'
                                }
                        }
                        const res = await axios
                                .put(` ${process.env.REACT_APP_API_URL}api/todo/${id}`, task, config)
                        console.log(res);
                        toast.success("Task Completed");
                        handleCloseEdit();
                } catch (err) {
                        alert(err.message);
                }




        }

        return (
                <div>
                        <Container maxWidth="xl">
                                <Card style={styles.card}>
                                        <CardContent>
                                                <div style={styles.header}>
                                                        <Typography variant="h5">{task.title}</Typography>

                                                        <Chip label={task.priority} />
                                                </div>
                                                <div style={styles.checkbox}>
                                                        <Checkbox
                                                                checked={checked}
                                                                onChange={handleChangeCheck}
                                                                inputProps={{ "aria-label": "controlled" }}
                                                                onClick={()=>completeTask(task._id)}
                                                                
                                                        />
                                                        <div>
                                                                <Typography variant="h6" style={{ textDecoration: task.isComplete ? "line-through" : "" }} >{task.description}</Typography>
                                                        </div>
                                                </div>
                                                <div style={styles.content}>
                                                        Task Due At: {moment(task.deadline).format("MMMM Do YYYY")}
                                                </div>
                                                <div style={styles.btn}>
                                                        <Button
                                                                variant="outlined"
                                                                color="error"
                                                                onClick={handleClickOpen}
                                                        >
                                                                <DeleteIcon />
                                                        </Button>
                                                        <Button variant="outlined" onClick={handleClickOpenEdit}>
                                                                <EditIcon />
                                                        </Button>
                                                </div>
                                        </CardContent>
                                </Card>

                                <Dialog
                                        open={openEdit}
                                        onClose={handleCloseEdit}
                                        fullWidth
                                        disableEscapeKeyDown={true}
                                >
                                        <DialogTitle>Update Task</DialogTitle>
                                        <Divider/>
                                        <DialogContent>
                                        <IconButton
                                        style={{ position: "absolute", top: "0", right: "0" }}
                                        onClick={() => setOpenEdit(false)}
                                        >
                                        <CloseIcon />
                                </IconButton>
                                                <Grid
                                                        container
                                                        spacing={3}
                                                        justifyContent="center"
                                                        alignItems="space-around"
                                                        flexDirection="column"
                                                >
                                                        <Grid item md={12}>
                                                                <TextField
                                                                        id="outlined-required"
                                                                        label="Task Title"
                                                                        fullWidth
                                                                        variant="outlined"
                                                                        name="title"
                                                                        value={title}
                                                                        onChange={(e) => setTitle(e.target.value)}
                                                                />
                                                        </Grid>
                                                        <Grid item md={12}>
                                                                <TextField
                                                                        id="outlined-required"
                                                                        label="Task Deskcription"
                                                                        fullWidth
                                                                        variant="outlined"
                                                                        multiline
                                                                        maxRows={10}
                                                                        value={description}
                                                                        onChange={(e) => setDescription(e.target.value)}
                                                                />
                                                        </Grid>
                                                        <Grid item md={12}>
                                                                <TextField
                                                                        id="outlined-required"
                                                                        label="Task Priority"
                                                                        fullWidth
                                                                        select
                                                                        variant="outlined"
                                                                        value={priority}
                                                                        onChange={(e) => setPriority(e.target.value)}
                                                                >
                                                                        <MenuItem value="High">High</MenuItem>
                                                                        <MenuItem value="Medium">Medium</MenuItem>
                                                                        <MenuItem value="Low">Low</MenuItem>
                                                                </TextField>
                                                        </Grid>
                                                        <Grid item md={12}>
                                                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                                                        <DesktopDatePicker
                                                                                label="Deadline"
                                                                                inputFormat="MM/DD/YYYY"
                                                                                value={deadline}
                                                                                onChange={(newValue) => setDeadline(newValue)}
                                                                                renderInput={(params) => (
                                                                                        <TextField {...params} fullWidth disabled />
                                                                                )}
                                                                                minDate={deadline}
                                                                        />
                                                                </LocalizationProvider>
                                                        </Grid>
                                                </Grid>
                                        </DialogContent>
                                        <DialogActions>
                                                <Button onClick={handleCloseEdit} variant="outlined" color="error">
                                                        Cancel
                                                </Button>
                                                <Button
                                                        onClick={() => updateTask(task._id)}
                                                        variant="contained"
                                                        color="primary"
                                                >
                                                        Submit
                                                </Button>
                                        </DialogActions>
                                </Dialog>

                                <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        fullWidth
                                        disableEscapeKeyDown={true}
                                >
                                        <DialogTitle>Delete Task</DialogTitle>
                                        <DialogContent>
                                                <Typography variant="h5">
                                                        Are you sure you want to delete this task?
                                                </Typography>
                                        </DialogContent>
                                        <DialogActions>
                                                <Button onClick={handleClose} variant="outlined" color="error">
                                                        No
                                                </Button>
                                                <Button
                                                        onClick={() => deleteTask(task._id)}
                                                        variant="outlined"
                                                        color="primary"
                                                >
                                                        Yes
                                                </Button>
                                        </DialogActions>
                                </Dialog>
                                <ToastContainer />
                        </Container>
                </div>
        );
};

export default Todos;
