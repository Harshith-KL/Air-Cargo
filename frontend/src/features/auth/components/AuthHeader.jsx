import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const AuthHeader = ({
    text,
    linkText,
    path,
    active,
}) => {
    return (
        <Box
            sx={{
                position: "absolute",
                top: 25,
                right: "clamp(16px, 8vw, 175px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                }}
            >
                <Typography
                    sx={{
                        fontSize: "13px",
                        color: "#63758c",
                    }}
                >
                    {text}
                </Typography>

                <Link
                    to={path}
                    style={{
                        textDecoration: "none",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#1677c8",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        {linkText}
                    </Typography>
                </Link>
            </Box>


            <Box
                sx={{
                    mt: 4,
                    display: "flex",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "14px",
                    width: "410px",
                    justifyContent: "space-between",
                    '@media (max-width: 768px)': {
                        width: "min(410px, calc(100vw - 32px))",
                    },
                    
                }}
            >
                <Link
                    to="/login"
                    style={{
                        textDecoration: "none",
                        flex: 1,
                    }}
                >
                    <Box
                        sx={{
                            py: 1,
                            px: 3,
                            borderRadius: "10px",
                            textAlign: "center",
                            backgroundColor:
                                active === "login"
                                    ? "#0f172a"
                                    : "transparent",
                            color:
                                active === "login"
                                    ? "#ffffff"
                                    : "#64748b",
                            fontWeight: 600,
                            fontSize: "14px",
                            transition: "0.2s",
                        }}
                    >
                        Sign in
                    </Box>
                </Link>
                <Link
                    to="/signup"
                    style={{
                        textDecoration: "none",
                        flex: 1,
                    }}
                >
                    <Box
                        sx={{
                            py: 1,
                            px: 3,
                            borderRadius: "10px",
                            textAlign: "center",
                            backgroundColor:
                                active === "signup"
                                    ? "#0f172a"
                                    : "transparent",
                            color:
                                active === "signup"
                                    ? "#ffffff"
                                    : "#64748b",
                            fontWeight: 600,
                            fontSize: "14px",
                            transition: "0.2s",
                        }}
                    >
                        Create account
                    </Box>
                </Link>
            </Box>
        </Box>
    );
};

export default AuthHeader;