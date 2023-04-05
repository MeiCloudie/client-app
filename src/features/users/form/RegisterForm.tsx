import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Formik } from "formik";
import { UserFormValues } from "../../../app/models/User";
import React from "react";
import Box from "@mui/material/Box";
import {
  AlertTitle,
  Button,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import MyPasswordForm from "../../../app/common/form/MyPasswordForm";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RegisterForm = observer(() => {
  const navigate = useNavigate();
  const { userStore } = useStore();

  const [open, setOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "click away") {
      return;
    }

    setOpen(false);
  };

  const [user, setUser] = React.useState<{
    password: string;
    userName?: string;
    displayName?: string;
    email: string;
    confirmPassword: string;
  }>({ password: "", confirmPassword: "", email: "" });

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    userName: Yup.string().optional(),
    displayName: Yup.string().required(),
    password: Yup.string().required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password must be match")
      .required(),
  });

  return (
    <Formik
      initialValues={user}
      onSubmit={(user: UserFormValues, actions) => {
        userStore.register(user).then((isSuccess) => {
          if (isSuccess) {
            navigate("/");
          } else {
            setIsSuccess(false);
          }
          setOpen(true);
          actions.setSubmitting(false);
        });
      }}
      validationSchema={validationSchema}
    >
      {({ errors, handleSubmit, handleChange, isSubmitting }) => (
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
              helperText={errors.email}
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
              helperText={errors.userName}
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
              helperText={errors.displayName}
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

            <MyPasswordForm label="Password" name="password" />
            <MyPasswordForm label="Confirm password" name="confirmPassword" />

            <Button
              type="submit"
              variant="contained"
              sx={{ margin: "20px" }}
              disabled={isSubmitting}
            >
              Create Account
            </Button>

            {!isSuccess && (
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="warning"
                  sx={{ textAlign: "left" }}
                >
                  <AlertTitle>Warning</AlertTitle>
                  The data is malformed <strong>Please re-enter!</strong>
                </Alert>
              </Snackbar>
            )}

            <Typography variant="h6" gutterBottom>
              Already have an account? {""}
              <Link to="/login" style={{ textDecoration: "hover" }}>
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      )}
    </Formik>
  );
});

export default RegisterForm;
