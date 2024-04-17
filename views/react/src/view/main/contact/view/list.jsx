// @mui material components
import Card from "@mui/material/Card";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
// Soft UI Dashboard React components
import Box from "@mui/material/Box";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
// Soft UI Dashboard React example components
import Table from "layouts/Table";
import { contactPage, contactTitle } from "links";

// Custom styles for the Tables
import styles from "./styles";


import { columns, modelList, modelListInit, modelListEmpty, modelPages } from "../model/list";
import { getContactList } from "../service";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setContactList } from "redux/action/contactAction";

function ContactList() {
    const classes = styles();
    const history = useHistory();
    const { contacts, pg } = useSelector(state => state.contactList);
    const dispatch = useDispatch();
    const handleView = (id, name) => {
        history.push({
            pathname: contactPage.CONTACT_VIEW,
            search: "?" + (name.replace(" ", "-").toLowerCase()),
            state: {
                id,
                name
            }
        });
    }
    const handleClick = (e, current) => {
        if (pg.current != current) {
            loadData(current);
        }
    }

    async function loadData(page) {
        await getContactList({ page }).then((res) => {
            if (res.flag) {
                if (Object.keys(res.data).length) {
                    dispatch(setContactList({
                        contacts: res.data,
                        pg: {
                            size: parseInt(res.headers["x-pagination-per-page"]),
                            pages: parseInt(res.headers["x-pagination-page-count"]),
                            current: parseInt(res.headers["x-pagination-current-page"]),
                            total: parseInt(res.headers["x-pagination-total-count"]),
                        }
                    }));
                } else {
                    dispatch(setContactList({
                        contacts: [],
                        pg: {
                            size: 0,
                            pages: 0,
                            current: 0,
                            total: 0,
                        }
                    }));
                }
            }

        });
    }
    useEffect(() => {
        loadData(0);
        // return () => {
        //     dispatch(setContactList({ contacts: [], pg: {} }));
        // }
    }, []);
    // if (contacts.length === 0) {
    //     return <>Loading</>
    // }

    // const table = (
    //     <DataTable
    //         title={pagesTitle.CONTACT_LIST}
    //         data={data}
    //         columns={columns}
    //         options={options}
    //     />
    // )

    const TableRender = () => {
        if (contacts === null) {
            return (
                <div>
                    <Table columns={columns} rows={modelListInit()} />
                </div>
            );
        } else if (contacts.length == 0) {
            return (
                <div>
                    <Table columns={columns} rows={modelListEmpty()} />
                </div>
            );
        } else {
            return (
                <div>
                    <Table columns={columns} rows={modelList(contacts, handleView)} />
                    <Box mt={1} mb={2} style={{ float: "right" }}>
                        {modelPages(pg, handleClick)}
                    </Box>
                </div>
            );
            // return (
            //     <div>
            //         <MUIDataTable
            //             title={"ACME Employee list"}
            //             data={contacts}
            //             columns={getColumn(handleView)}
            //             options={getOptions()}
            //         />
            //     </div>
            // );
        }
    }

    return (
        <Box py={3}>
            <Box mb={3}>
                <Card>
                    <Box display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <SuiTypography variant="h6">{contactTitle.CONTACT_LIST}</SuiTypography>
                        <Link to={contactPage.CONTACT_ADD}>
                            <SuiButton buttonColor="secondary">Add Contact</SuiButton>
                        </Link>
                    </Box>
                    <SuiBox customClass={classes.tables_table}>
                        <TableRender />
                    </SuiBox>
                </Card>
            </Box>
        </Box>
    );
}

export default ContactList;
