import { Formik } from "formik"
import { ChangePasswordFormValues } from "../../../app/models/User"
import * as Yup from 'yup'

import {
    AlertTitle,
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Snackbar,
    Stack,
    Typography,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";
import MyPasswordForm from "../../../app/common/form/MyPasswordForm";
import { useStore } from "../../../app/stores/store";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ChangePasswordForm = () => {

    const [open, setOpen] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const { userStore } = useStore()

    const handleClick = () => {
        if (isSuccess) {
            setIsSuccess(false);
        }
        else {
            setIsSuccess(true);
        }
        setOpen(true);
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const validationSchema = Yup.object({
        password: Yup.string().required(),
        newPassword: Yup.string().notOneOf([Yup.ref("password")], "New password and Password are the same!").required(),
        confirmPassword: Yup.string().oneOf([Yup.ref("newPassword")], "New password must be match ").required(),
    })
    return (
        <Formik
            key="change-password-form"
            initialValues={{ password: '', newPassword: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={(changePasswordFormValues: ChangePasswordFormValues, actions) => {
                userStore.changePassword(changePasswordFormValues).then((isSuccess) => {
                    if (isSuccess) {
                        setIsSuccess(true);
                    }
                    else {
                        setIsSuccess(false);
                    }
                    setOpen(true)
                    actions.setSubmitting(false)
                }
                )
            }}
        >
            {({ handleSubmit, handleChange, isSubmitting }) => (

                <Box
                    component="form"
                    sx={{
                        "& > :not(style)": { mt: 1, mb: 1, width: "100ch" },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <Typography
                        variant="h5"
                        gutterBottom
                        style={{
                            color: "#1565c0",
                        }}
                    >
                        Change Password:
                    </Typography>

                    <MyPasswordForm label="Current Password" name="password" />
                    <MyPasswordForm label="New Password" name="newPassword" />
                    <MyPasswordForm label="Confirm Password" name="confirmPassword" />


                    <Stack sx={{ width: "100%" }} spacing={2}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Stack spacing={2} direction="row">
                                <Button type="submit" variant="contained" disabled={isSubmitting}>
                                    Change Password
                                </Button>
                            </Stack>
                        </div>
                        {!isSuccess && (
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="warning">
                                    <AlertTitle>Warning</AlertTitle>
                                    The current password is incorrect or the new password is not in
                                    the correct format. <strong>Please re-enter!</strong>
                                </Alert>
                            </Snackbar>
                        )}

                        {isSuccess && (
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success">
                                    <AlertTitle>Success</AlertTitle>
                                    Password change successfully!
                                </Alert>
                            </Snackbar>
                        )}
                    </Stack>
                </Box>


            )}
        </Formik>
    )
}

export default ChangePasswordForm