import { Backdrop, CircularProgress } from '@mui/material';
import { makeStyles } from "@mui/styles";
import SuiTypography from "components/SuiTypography";

const useStyles = makeStyles(() => {
    return {
        backdrop: {
            zIndex: 1100,
            color: '#fff',
        },
    }
});

function BackDrop({ open, message }) {
    const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open={open}>
            <SuiTypography textColor="white" varient="body1" component="p" style={{ marginRight: 20 }}>{message}</SuiTypography>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

BackDrop.defaultProps = {
    open: true,
    message: "Loading",
};

export default BackDrop;