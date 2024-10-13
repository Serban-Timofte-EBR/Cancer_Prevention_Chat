import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import Image from "next/image";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // State to store error message

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/auth/login",
        formData
      );
      localStorage.setItem("token", res.data.access_token);
      router.push("/chatbot");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Login failed. Please check your email and password.");
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 50%, #ba68c8 100%)",
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: "white",
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              mb: 4,
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/eOncoHub.jpg"
              alt="Logo"
              width={300}
              height={250}
              style={{ objectFit: "contain" }}
            />
          </Box>

          {/* Login Title */}
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Sign in to your account
          </Typography>

          {/* Display Error Message if Login Fails */}
          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, py: 1.5, backgroundColor: "#4F46E5" }}
            >
              Sign in
            </Button>
          </Box>

          {/* Divider */}
          <Typography sx={{ my: 2 }}>or</Typography>

          {/* Create Account Button */}
          <Button
            fullWidth
            variant="outlined"
            onClick={handleRegister}
            sx={{ py: 1.5, borderColor: "#4F46E5", color: "#4F46E5" }}
          >
            Create account
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
