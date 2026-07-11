import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Stack,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSignup} from "../hooks/useSignup";
import GoogleIcon from "@mui/icons-material/Google";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import toast from "react-hot-toast";

const SignupForm = () => {
    const navigate = useNavigate();
    const { mutate, isPending } = useSignup();
    const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    password: "",
    organizationName: "",
    organizationAddress: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: (data) => {
        toast.success("Account Created Successfully");
        localStorage.setItem("token", data.data.token);
        localStorage.setItem(
        "user",
        JSON.stringify(data.data.user)
    );
        navigate("/dashboard");
      },      
      onError: (error) => {
        toast.error(error.response?.data?.message || "Signup Failed. Please check all the fields");
      },
    });
  };

  const [showPassword, setShowPassword] = useState(false);

return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "430px",
        mt: 18,
        mb: 8,
      }}
    >

      <Box sx={{ mb: 4, textAlign: "left", color: "black" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", fontSize: "24px" }}
        >
          Create your account
        </Typography>

        <Typography
          sx={{
            mt: 1.5,
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Set up your organization to start booking air cargo.
        </Typography>
      </Box>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, mb: 1, color: "#374151", textAlign: "left", fontSize: "12px" }}
          >
            Full name
          </Typography>
          <TextField
            fullWidth
            name="fullName"
            placeholder="Riya Anand"
            value={formData.fullName}
            onChange={handleChange}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
              "& .MuiInputBase-input": {py: "8px", fontSize: "14px",},
            }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, mb: 1, color: "#374151", textAlign: "left", fontSize: "12px" }}
          >
            Contact number
          </Typography>
          <TextField
            fullWidth
            name="contactNumber"
            placeholder="+91 98765 43210"
            value={formData.contactNumber}
            onChange={handleChange}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: "8px" },
              "& .MuiInputBase-input": {py: "8px", fontSize: "14px",},
            }}
          />
        </Box>
      </Stack>

      <Typography
        variant="body2"
        sx={{ fontWeight: 700, mb: 1, color: "#374151", textAlign: "left", fontSize: "12px" }}
      >
        Work email
      </Typography>
      <TextField
        fullWidth
        name="email"
        placeholder="you@company.com"
        value={formData.email}
        onChange={handleChange}
        size="small"
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": { borderRadius: "8px" },
          "& .MuiInputBase-input": {py: "8px", fontSize: "14px",},
        }}
      />

      <Typography
        variant="body2"
        sx={{ fontWeight: 700, mb: 1, color: "#374151", textAlign: "left", fontSize: "12px" }}
      >
        Password <Box component="span" sx={{ fontWeight: 400, color: "#94a3b8" }}>min. 6 characters</Box>
      </Typography>
      <TextField
        fullWidth
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="******"
        value={formData.password}
        onChange={handleChange}
        size="small"
slotProps={{
  input: {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setShowPassword(!showPassword)}
          edge="end"
        >
          {showPassword ? (
            <VisibilityOffOutlinedIcon sx={{ fontSize: 20, color: "#111214" }}/>
          ) : (
            <VisibilityOutlinedIcon sx={{ fontSize: 20, color: "#111214" }}/>
          )}
        </IconButton>
      </InputAdornment>
    ),
  },
}}
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": { borderRadius: "8px" },
          "& .MuiInputBase-input": {py: "8px", fontSize: "14px",},
        }}
      />

      <Typography
        variant="body2"
        sx={{
          fontWeight: 700,
          mb: 1,
          color: "#94a3b8",
          textAlign: "left",
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        Organization
      </Typography>

      <Typography
        variant="body2"
        sx={{ fontWeight: 700, mb: 1, color: "#374151", textAlign: "left", fontSize: "12px" }}
      >
        Organization name
      </Typography>
      <TextField
        fullWidth
        name="organizationName" 
        placeholder="ABC Exports Pvt. Ltd."
        value={formData.organizationName}
        onChange={handleChange}
        size="small"
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": { borderRadius: "8px" },
          "& .MuiInputBase-input": {py: "8px", fontSize: "14px",},
          "& input::placeholder": {fontSize: "13px",},
        }}
      />

      <Typography
        variant="body2"
        sx={{ fontWeight: 700, mb: 1, color: "#374151", textAlign: "left", fontSize: "12px" }}
      >
        Organization address
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={2}
        name="organizationAddress" 
        placeholder="Street, city, state, postal code, country"
        value={formData.organizationAddress}
        onChange={handleChange}
        size="small"
        sx={{
          mb: 4,
          "& .MuiOutlinedInput-root": { borderRadius: "8px" },
          "& .MuiInputBase-input": {py: "0px", fontSize: "14px",},
          "& input::placeholder": {fontSize: "13px",},
        }}
      />

      <Button
        fullWidth
        type="submit"
        variant="contained"
        size="small"
        disabled={isPending}
        sx={{
          py: 1.5,
          borderRadius: "12px",
          textTransform: "none",
          fontWeight: 700,
          fontSize: "14px",
          backgroundColor: "#2563eb",
          "&:hover": {
            backgroundColor: "#1d4ed8",
          }
        }}
      >
    {isPending ? (<CircularProgress size={22} color="inherit"/>) : ("Create Account")}
      </Button>

      <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
        <Divider sx={{ flexGrow: 1, borderColor: "#94a3b8" }} />
        <Typography
          variant="body2"
          sx={{ mx: 2, color: "#94a3b8", fontSize: "12px", whiteSpace: "nowrap" }}
        >
          or continue with
        </Typography>
        <Divider sx={{ flexGrow: 1, borderColor: "#94a3b8" }} />
      </Box>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          fullWidth
          type="button"
          variant="outlined"
          startIcon={<GoogleIcon sx={{ color: "#db4a37", fontSize: "18px" }} />}
          sx={{
            py: 1.2,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 600,
            color: "#334155",
            borderColor: "#c4cad4",
            "&:hover": {
              borderColor: "#535557",
              backgroundColor: "#f8fafc",
            },
          }}
        >
          Google
        </Button>

        <Button
          fullWidth
          type="button"
          variant="outlined"
          startIcon={<BusinessCenterOutlinedIcon sx={{ color: "#262a2f", fontSize: "18px" }} />}
          sx={{
            py: 1.2,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 600,
            color: "#334155",
            borderColor: "#c4cad4",
            "&:hover": {
              borderColor: "#535557",
              backgroundColor: "#f8fafc",
            },
          }}
        >
          SSO
        </Button>
      </Stack>


      <Typography
        variant="caption"
        sx={{ color: "#64748b", display: "block", textAlign: "center", fontSize: "11px", lineHeight: 1.5 }}
      >
        By creating an account you agree to Manifest's{" "}
        <Box component="span" sx={{ color: "#475569", textDecoration: "underline", cursor: "pointer" }}>
          Terms of Service
        </Box>{" "}
        and{" "}
        <Box component="span" sx={{ color: "#475569", textDecoration: "underline", cursor: "pointer" }}>
          Privacy Policy
        </Box>
        .
      </Typography>
    </Box>
  );
};

export default SignupForm;