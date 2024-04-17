import Typography from "@mui/material/Typography";

// Custom styles for SuiTypography
import styles from "./styles";

const SkTypography = ({ children, warpLength, ...rest }) => {
    const classes = styles({ warpLength });

    return (
        <Typography
            {...rest}
            className={classes.skTypography, classes.wrapText}
        >
            {children}
        </Typography>
    );
}

export default SkTypography;