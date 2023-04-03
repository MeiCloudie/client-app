import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/stores/store"
import { Formik } from "formik"
import { UserFormValues } from "../../../app/models/User";
import React from "react"
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import EmailIcon from "@mui/icons-material/Email";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Link } from "react-router-dom";

const RegisterForm = observer(() => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const { userStore } = useStore()
    const [user, setUser] = React.useState<UserFormValues>({ password: '' })

    const handleForSubmit = (user: UserFormValues) => {
        console.log(user)
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    return (
        <Formik
            initialValues={user}
            onSubmit={handleForSubmit}
        >
            {({ handleSubmit, handleChange, isSubmitting }) => (
                <Box sx={{ margin: "100px", textAlign: "center" }}>
                    <Typography
                        variant="h4"
                        fontWeight={800}
                        sx={{ color: "#9098e1", margin: "0" }}
                        gutterBottom
                    >
                        REGISTER
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
                            id="email-outlined-basic"
                            label="Email"
                            variant="outlined"
                            placeholder="Enter your email here!"
                            name="email"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            id="username-outlined-basic"
                            label="Username"
                            variant="outlined"
                            placeholder="Create your username here!"
                            name="userName"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleRoundedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            id="displayname-outlined-basic"
                            label="Display Name"
                            variant="outlined"
                            placeholder="Create your display name here!"
                            name="displayName"
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DriveFileRenameOutlineIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <FormControl sx={{ m: 0, width: "25ch" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>

                        <FormControl sx={{ m: 0, width: "25ch" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">
                                Confirm Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm Password"
                            />
                        </FormControl>
                        <Button type="submit" variant="contained" sx={{ margin: "20px" }} disabled={isSubmitting}>
                            Create Account
                        </Button>
                        <Typography variant="h6" gutterBottom>
                            Already have an account? {""}
                            <Link to="/login" style={{ textDecoration: "hover" }}>Login</Link>
                        </Typography>
                    </Box>
                </Box>
            )}
        </Formik>
    )
})

export default RegisterForm