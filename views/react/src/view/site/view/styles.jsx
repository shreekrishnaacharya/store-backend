import { makeStyles } from '@mui/styles';


export default makeStyles(({ palette, functions, borders }) => {

    return {

        loginBtn: {
            marginTop: 10,
            flexGrow: 1
        },
        hide: {
            display: "none",
        },
        textRed: {
            color: "red",
            fontSize: 16
        },
        textGreen: {
            color: "green",
            fontSize: 16
        },
        header: {
            textAlign: 'left',
            background: '#1DC0C8',
            color: '#fff'
        },
        card: {
            marginTop: 50,
            paddingBottom: 10
        },
        links: {
            margin: 10,
            fontSize: 14
        },
        // header: {
        //     textAlign: 'left',
        //     background: '#678082',
        //     color: '#fff'
        // },
    }
});