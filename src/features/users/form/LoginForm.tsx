import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Formik } from "formik";
import { UserFormValues } from "../../../app/models/User";
import React from "react";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LinkButton from "../../../app/common/button/LinkButton";
import agent from "../../../app/api/agent";
import MyPasswordForm from "../../../app/common/form/MyPasswordForm";

const LoginForm = () => {
    const { userStore } = useStore()
    const [user, setUser] = React.useState<UserFormValues>({ userName: '', password: '' })
    const [showPassword, setShowPassword] = React.useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const handleForSubmit = (user: UserFormValues) => userStore.login(user)
    return (
        <Formik
            initialValues={user}
            onSubmit={handleForSubmit}
        >
            {({ handleSubmit, handleChange, isSubmitting }) => (
                <Box sx={{ margin: "217px 100px", textAlign: "center" }}>
                    <Typography
                        variant="h4"
                        fontWeight={800}
                        sx={{ color: "#9098e1", margin: "0" }}
                        gutterBottom
                    >
                        LOGIN
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { margin: "10px 0", width: "100%" },
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            id="email-username-outlined-basic"
                            name="userName"
                            label="Email/Username"
                            variant="outlined"
                            placeholder="Enter your email or username here!"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleRoundedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <MyPasswordForm label="Password" name="password" />
                        <Grid container sx={{ alignItems: "center" }}>
                            <Grid item xs={6}>
                                {/* <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked />}
                                        label="Remember"
                                        sx={{ color: "#888176" }}
                                    />
                                </FormGroup> */}
                            </Grid>
                            <Grid item xs={6} sx={{ textAlign: "right" }}>
                                <Link to="/error" style={{ textDecoration: "hover" }} color={"#888176"}>
                                    Forgot Password?
                                </Link>
                            </Grid>
                        </Grid>

                        <Button type="submit" variant="contained" sx={{ margin: "20px" }} disabled={isSubmitting}>
                            LOGIN
                        </Button>
                        <Typography variant="h6" gutterBottom>
                            Don't have an account? {""}
                            <Link to="/register" style={{ textDecoration: "hover" }}>
                                Register
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            )}
        </Formik>
    )
}

export default observer(LoginForm)