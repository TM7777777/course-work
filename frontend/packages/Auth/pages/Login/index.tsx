import React from "react";
import { useLocation, Link } from "wouter";
import { Paper, Box, TextField, Button, Typography, Container } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import service from "work-service";
import { save } from "work-common/utils/localStorage";
import { useAuth } from "../../authContext";

const paperStyle = {
  padding: "20px",
  width: 300,
  margin: "20px auto",
};

const btnStyle = {
  marginTop: "24px",
  marginBottom: "16px",
};

const validationSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const LoginPage: React.FC = () => {
  const { setUser } = useAuth();
  const [_, navigate] = useLocation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      service.login(values).then((user) => {
        const { accessToken, role, email } = user;
        const dto = { role, email };

        save("accessToken", accessToken);
        save("user", dto);
        setUser(dto);

        return navigate("/enterprises");
      });
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Paper elevation={10} style={paperStyle}>
          <Typography component="h1" variant="h5" style={{ textAlign: "center", margin: "20px 0" }}>
            Login
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
            />
            <Button type="submit" fullWidth variant="contained" style={btnStyle}>
              Login
            </Button>
            Doesn't have an account? <Link href="register">Sign Up</Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
