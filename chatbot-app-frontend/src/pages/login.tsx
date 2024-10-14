import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      const { userId } = response.data;

      // Redirect to /chatbot/:userId
      router.push(`/chatbot/${userId}`);
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        <Paper
          elevation={6}
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
            sx={{ mb: 4, height: 200, display: "flex", alignItems: "center" }}
          >
            <Image
              src="/eOncoHub.jpg"
              alt="Logo"
              width={240}
              height={180}
              objectFit="contain"
            />
          </Box>

          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Login to Your Account
          </Typography>

          {/* Display Error Message */}
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {/* Login Form */}
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            sx={{ width: "100%" }}
          >
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Field with Show/Hide Toggle */}
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5, backgroundColor: "#4F46E5" }}
            >
              Login
            </Button>

            {/* Create Account Button */}
            <Button
              fullWidth
              variant="outlined"
              onClick={() => router.push("/register")}
              sx={{ mt: 1, mb: 2, borderColor: "#4F46E5", color: "#4F46E5" }}
            >
              Create Account
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
