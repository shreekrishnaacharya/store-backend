import Swal from 'sweetalert2';
import LinearProgress from '@mui/material/LinearProgress';
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);

const successAlert = () => {
    MySwal.fire({
        title: 'Good job!',
        text: 'You clicked the button.',
        icon: 'success'
    });
}



const updateAlert = (props, callback) => {
    return MySwal.fire({
        confirmButtonText: 'Update',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        ...props,
        showLoaderOnConfirm: true,
        preConfirm: (result) => {
            return callback(result).then((res) => {
                MySwal.close();
                return res;
            });
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
}

const confirmAlert = (props) => {
    return MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '&nbsp;&nbsp;&nbsp;&nbsp;Yes&nbsp;&nbsp;&nbsp;&nbsp;',
        allowOutsideClick: false,
        width: 500,
        height: 300,
        padding: '1em',
        ...props
    });
}

const deleteAlert = (props, callback) => {
    return MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '&nbsp;&nbsp;&nbsp;&nbsp;Yes&nbsp;&nbsp;&nbsp;&nbsp;',
        allowOutsideClick: false,
        width: 500,
        height: 300,
        padding: '1em',
        ...props
    }).then((result) => {
        if (result.isConfirmed) {
            MySwal.fire({
                title: "Loading",
                html: <><LinearProgress /><br /><p>Please Wait ...</p></>,
                showCloseButton: false,
                showCancelButton: false,
                allowOutsideClick: false,
                focusConfirm: false,
                showConfirmButton: false,
            });
            return callback().then((res) => {
                MySwal.close();
                return res;
            });
        }
        return null;
    });
}


export {
    successAlert,
    confirmAlert,
    deleteAlert,
    updateAlert
}