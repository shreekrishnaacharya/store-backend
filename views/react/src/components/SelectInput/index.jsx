import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

const SelectInput = ({ handleOptions, label, ...rest }) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const optionsList = await handleOptions(value);
            console.log(optionsList);
            if (active && optionsList) {
                setOptions([...optionsList]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            {...rest}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            onInputChange={(event, newValue) => {
                setValue(newValue);
            }}
            isOptionEqualToValue={(option, value) => option[label] === value[label]}
            getOptionLabel={(option) => option[label]}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

SelectInput.defaultProps = {
    label: "name",
};

export default SelectInput;