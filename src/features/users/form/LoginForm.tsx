import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Formik } from "formik";
import { UserFormValues } from "../../../app/models/User";
import React from "react";
import {
  AlertTitle,
  Box,
  Button,
  Grid,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Link } from "react-router-dom";
import MyPasswordForm from "../../../app/common/form/MyPasswordForm";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginForm = () => {
  const { userStore } = useStore();
  const [user, setUser] = React.useState<UserFormValues>({
    userName: "",
    password: "",
  });
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

  const handleForSubmit = (user: UserFormValues) => userStore.login(user);
  return (
    <Formik
      initialValues={user}
      onSubmit={handleForSubmit}
    //   onSubmit={(user: UserFormValues, actions) => {
    //     userStore.login(user).then((isSuccess) => {
    //       if (isSuccess) {
    //         setIsSuccess(true);
    //         actions.resetForm();
    //       } else {
    //         setIsSuccess(false);
    //       }
    //       setOpen(true);
    //       actions.setSubmitting(false);
    //     });
    //   }}
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
                <Link
                  to="/error"
                  style={{ textDecoration: "hover" }}
                  color={"#888176"}
                >
                  Forgot Password?
                </Link>
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              sx={{ margin: "20px" }}
              disabled={isSubmitting}
            >
              LOGIN
            </Button>
            {!isSuccess && (
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="warning">
                  <AlertTitle>Warning</AlertTitle>
                  Your account information does not exist or the data is
                  malformed <strong>Please re-enter!</strong>
                </Alert>
              </Snackbar>
            )}
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
  );
};

export default observer(LoginForm);
