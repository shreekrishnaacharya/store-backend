// @mui material components
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// Soft UI Dashboard React components
import Box from "@mui/material/Box";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
// Soft UI Dashboard React example components
import Table from "layouts/Table";
import { customerPage, customerTitle } from "links";

// Custom styles for the Tables
import styles from "./styles";


import { columns, modelList, modelListInit, modelListEmpty, modelPages } from "../model/list";
import { getCustomerList } from "../service";
import { Link } from 'react-router-dom';

function CustomerList() {
    const initCustomer = {
        customers: null,
        pg: {
            size: 0,
            pages: 0,
            current: 0,
            total: 0,
        }
    };
    const [custData, setCustomer] = useState(initCustomer);
    const classes = styles();
    const history = useHistory();
    const handleView = (id, name) => {
        history.push({
            pathname: customerPage.CUSTOMER_VIEW,
            search: "?" + (name.replace(" ", "-").toLowerCase()),
            state: {
                id,
                name
            }
        });
    }
    const handleClick = (e, current) => {
        if (custData.pg.current != current) {
            loadData(current);
        }
    }

    async function loadData(page) {
        await getCustomerList({ page }).then((res) => {
            if (res.flag) {
                if (Object.keys(res.data).length) {
                    setCustomer({
                        customers: res.data,
                        pg: {
                            size: parseInt(res.headers["x-pagination-per-page"]),
                            pages: parseInt(res.headers["x-pagination-page-count"]),
                            current: parseInt(res.headers["x-pagination-current-page"]),
                            total: parseInt(res.headers["x-pagination-total-count"]),
                        }
                    });
                } else {
                    setCustomer(initCustomer);
                }
            }

        });
    }
    useEffect(() => {
        loadData(0);
        return () => {
            setCustomer(initCustomer);
        }
    }, []);
    const dataaa = [
        { id: 1, name: 'wahid' },
        { id: 2, name: 'jamil' },
        { id: 3, name: 'marin' },
    ];
    const columnsss = [
        {
            name: "id",
            label: "Id",
        },
        {
            name: "name",
            label: "Name",
        }
    ];


    const TableRender = () => {
        if (custData.customers === null) {
            return (
                <div>
                    <Table columns={columns} rows={modelListInit()} />
                </div>
            );
        } else if (custData.customers.length == 0) {
            return (
                <div>
                    <Table columns={columns} rows={modelListEmpty()} />
                </div>
            );
        } else {
            return (
                <div>
                    <Table columns={columns} rows={modelList(custData.customers, handleView)} />
                    <Box mt={1} mb={2} style={{ float: "right" }}>
                        {modelPages(custData.pg, handleClick)}
                    </Box>
                </div>
            );
        }
    }

    return (
        <Box py={3}>
            <Box mb={3}>
                <Card>
                    <Box display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <SuiTypography variant="h6">{customerTitle.CUSTOMER_LIST}</SuiTypography>
                        <Link to={customerPage.CUSTOMER_ADD}>
                            <SuiButton buttonColor="secondary">Add Customer</SuiButton>
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

export default CustomerList;
