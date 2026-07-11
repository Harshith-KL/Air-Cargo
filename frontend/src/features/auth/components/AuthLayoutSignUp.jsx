import {Box, Typography, Stack,} from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

const AuthLayoutSignUp = ({ children }) => {
    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                '@media (max-width: 768px)': {
                    flexDirection: 'column',
                }
            }}
        >

            <Box
                sx={{
                    width: "40%",
                    background: "linear-gradient(180deg,#04122d 0%, #020817 100%)",
                    color: "#fff",
                    px: 6,
                    py: 3.5,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    '@media (max-width: 768px)': {
                        width: '100%',
                    }
                }}
            >

                <Box>
                    <Typography
                        sx={{
                            mt:3,
                            mr: 55,
                            color: "#e2edfd",
                            letterSpacing: 1,
                            fontSize: 12,
                            fontWeight: 800,
                            
                        }}
                    >
                    <FlightTakeoffIcon /> MANIFEST
                    </Typography>

                    <Typography
                        sx={{
                            mt: 38,
                            mr: 47,
                            color: "#3b82f6",
                            letterSpacing: 1,
                            fontSize: 12,
                            fontWeight: 500,
                        }}
                    >
                        AIR CARGO OPERATIONS
                    </Typography>

                    <Typography
                        sx={{
                            mt: 3,
                            fontSize: "35px",
                            fontWeight: 700,
                            lineHeight: 1.05,
                            maxWidth: "520px",
                            mr: 30,
                            textAlign: "left",
                        }}
                    >
                        Book, track,
                        <br />
                        and manage
                        <br />
                        every shipment
                        <br />
                        in one place.
                    </Typography>

                    <Typography
                        sx={{
                            mt:2,
                            color: "#cbd5e1",
                            fontSize: 15,
                            lineHeight: 1.5,
                            maxWidth: "350px",
                            textAlign: "left",
                        }}
                    >
                        From draft to delivered — a single guided workflow
                        for your air freight bookings, with live tracking
                        and document handling built in.
                    </Typography>

                    
                    <Stack
                        spacing={1.5}
                        sx={{
                            mt: 5,
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                        >
                            <Inventory2OutlinedIcon />
                            <Typography sx={{ fontSize: "12px" }}>
                                Guided bookings in under two minutes
                            </Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                        >
                            <TimelineOutlinedIcon />
                            <Typography sx={{ fontSize: "12px", }}>
                                Real-time status across the full pipeline
                            </Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                        >
                            <DescriptionOutlinedIcon />
                            <Typography sx={{ fontSize: "12px" }}>
                                Air waybills & documents, always in sync
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>

                {/* Footer */}
                <Typography
                    sx={{
                        color: "#94a3b8",
                        fontSize: 12,
                        mt:2,
                        mr: 27,
                    }}
                >
                    © 2026 Manifest Logistics · IATA-compliant air cargo platform
                </Typography>
            </Box>

           

            <Box
                sx={{
                    flex: 1,
                    mt: 20,
                    background: "#f8fafc",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "auto",
                    '@media (max-width: 768px)': {
                        width: '100%',
                    }
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default AuthLayoutSignUp;