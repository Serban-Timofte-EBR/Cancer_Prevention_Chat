import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Switch,
  Select,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    gender: "Male",
    smoker: false,
    region: "Vrancea",
    ageInterval: "< 20",
    medicalCondition: "None from the list",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", formData);
      router.push("/login");
    } catch (error) {
      setError("Registration failed. Please try again.");
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
            sx={{ mb: 4, height: 100, display: "flex", alignItems: "center" }}
          >
            <Image
              src="/eOncoHub.jpg"
              alt="Logo"
              width={240}
              height={80}
              objectFit="contain"
            />
          </Box>

          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Create Your Account
          </Typography>

          {/* Display Error Message */}
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {/* Registration Form */}
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

            {/* Password Field with Show/Hide Toggle */}
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
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

            <TextField
              select
              fullWidth
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              margin="normal"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>

            {/* Smoker Toggle */}
            <FormControlLabel
              control={
                <Switch
                  checked={formData.smoker}
                  onChange={(e) =>
                    setFormData({ ...formData, smoker: e.target.checked })
                  }
                  color="primary"
                />
              }
              label="Smoker"
              sx={{ mt: 2 }}
            />

            <TextField
              select
              fullWidth
              label="Region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              margin="normal"
            >
              <MenuItem value="Vrancea">Vrancea</MenuItem>
              <MenuItem value="București">București</MenuItem>
              <MenuItem value="Ilfov">Ilfov</MenuItem>
            </TextField>

            <TextField
              select
              fullWidth
              label="Age Interval"
              name="ageInterval"
              value={formData.ageInterval}
              onChange={handleChange}
              margin="normal"
            >
              <MenuItem value="< 20">&lt; 20</MenuItem>
              <MenuItem value="21 - 30">21 - 30</MenuItem>
              <MenuItem value="31 - 40">31 - 40</MenuItem>
            </TextField>

            {/* Medical Condition Dropdown */}
            <TextField
              select
              fullWidth
              label="Medical Condition"
              name="medicalCondition"
              value={formData.medicalCondition}
              onChange={handleChange}
              margin="normal"
            >
              <MenuItem value="None from the list">None from the list</MenuItem>
              <MenuItem value="Cardiovascular incident">
                Cardiovascular incident
              </MenuItem>
              <MenuItem value="Diabetes">Diabetes</MenuItem>
              <MenuItem value="Renal problems">Renal problems</MenuItem>
              <MenuItem value="Hypertension">Hypertension</MenuItem>
              <MenuItem value="Obesity">Obesity</MenuItem>
            </TextField>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5, backgroundColor: "#4F46E5" }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
