import { useRef, useState } from "react";
import { makeStyles, useTheme } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";

const FileInput = ({ children, onChange, ...rest }) => {
    const ref = useRef();
    const [attachment, setAttachment] = useState(null);

    const handleChange = (event) => {
        const files = Array.from(event.target.files);
        const [file] = files;
        setAttachment(file);
        if (!!onChange) onChange(file);
    };

    return (
        <Box>
            <Button
                variant="outlined"
                size="medium"
                color="secondary"
                {...rest}
                component="label"
                onKeyDown={(e) => e.keyCode === 32 && ref.current?.click()}
            >
                {children}
                <input
                    ref={ref}
                    type="file"
                    hidden
                    onChange={handleChange}
                />
            </Button>
            <Typography style={{ marginLeft: "5px" }} variant="caption" component="span">{attachment ? attachment.name : "no file selected"}</Typography>
        </Box>
    );
};

export default FileInput;
