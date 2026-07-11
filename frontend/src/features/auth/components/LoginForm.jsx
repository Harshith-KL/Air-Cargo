import {
    Box,
    Typography,
    TextField,
    Button,
    Divider,
    Stack,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    IconButton,
    CircularProgress,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import toast from "react-hot-toast";

const LoginForm = () => {
    const navigate = useNavigate();
    const { mutate, isPending } = useLogin();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("user",JSON.stringify(data.data.user)
    );
                toast.success("Login Successful");
                navigate("/dashboard");
            },
            onError: (error) => {
                toast.error(error.response?.data?.message || "Login Failed. Invalid email or password");
            },
        });
    };

    const [showPassword, setShowPassword] = useState(false);


    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                width: "100%",
                maxWidth: "430px",
                px: 3,
                mt: 18,
                '@media (max-width: 768px)': {
                    mt: 8,
                }
            }}
        >

            <Box
                sx={{
                    mb: 4,
                    textAlign: "left",
                    color: "black",

                }}
            >
                <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", fontSize: "24px" }}
                >
                    Welcome back
                </Typography>

                <Typography
                    sx={{
                        mt: 1,
                        color: "#64748b",
                        fontSize: "16px",

                    }}
                >
                    Sign in to manage your shipment bookings.
                </Typography>
            </Box>

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
                Password
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
        mb: 2,
        "& .MuiOutlinedInput-root": { borderRadius: "8px" },
        "& .MuiInputBase-input": {py: "8px", fontSize: "14px",},
    }}
/>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                    mt: -1,
                }}
            >
                <FormControlLabel
                    control={<Checkbox />}
                    label="Remember me"
                    slotProps={{
                        typography: { sx: { fontSize: "12px", color: "black" } },
                    }}
                />

                <Typography
                    sx={{
                        color: "#2563eb",
                        fontWeight: 600,
                        cursor: "pointer",
                        fontSize: "12px",

                    }}
                >
                    Forgot password?
                </Typography>
            </Box>

            <Button
                fullWidth
                variant="contained"
                type="submit"
                size="small"
                disabled={isPending}
                sx={{
                    py: 1.5,
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 700,
                    backgroundColor: "#2563eb",
                    "&:hover": {
                        backgroundColor: "#1d4ed8",
                    }
                }}
            >
            {isPending ? (<CircularProgress size={22} color="inherit"/>) : ("Sign in")}
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


            <Stack direction="row" spacing={2}>
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon sx={{ color: "#db4a37" }} />} 
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
                    variant="outlined"
                    startIcon={<BusinessCenterOutlinedIcon sx={{ color: "#262a2f" }} />}
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

        </Box>
    );
};

export default LoginForm;