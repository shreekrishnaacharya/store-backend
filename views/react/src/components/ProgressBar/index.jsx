import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ProgressBar = () => {
    return (
        <Box p={12} m={12} sx={{ display: "flex", justifyContent: "center" }} >
            <CircularProgress />
        </Box >
    );
}

export default ProgressBar;