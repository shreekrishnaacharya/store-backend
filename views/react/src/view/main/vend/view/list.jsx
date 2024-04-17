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
import { vendPage, vendTitle } from "links";
// Custom styles for the Tables
import styles from "./styles";

import { columns, modelList, modelListInit, modelListEmpty, modelPages } from "../model/list";
import { getVendList } from "../service";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

function VendList() {
    const initVendor = {
        vends: null,
        pg: {
            size: 0,
            pages: 0,
            current: 0,
            total: 0,
        }
    };
    const [vendData, setVendor] = useState(initVendor);

    const classes = styles();
    const history = useHistory();
    const { vends, pg } = vendData;
    const handleView = (id, name) => {
        history.push({
            pathname: vendPage.VEND_VIEW,
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
        await getVendList({ page }).then((res) => {
            if (res.flag) {
                if (Object.keys(res.data).length) {
                    setVendor({
                        vends: res.data,
                        pg: {
                            size: parseInt(res.headers["x-pagination-per-page"]),
                            pages: parseInt(res.headers["x-pagination-page-count"]),
                            current: parseInt(res.headers["x-pagination-current-page"]),
                            total: parseInt(res.headers["x-pagination-total-count"]),
                        }
                    });
                } else {
                    setVendor({
                        vends: [],
                        pg: {
                            size: 0,
                            pages: 0,
                            current: 0,
                            total: 0,
                        }
                    });
                }
            }

        });
    }
    useEffect(() => {
        loadData(0);
    }, []);

    const TableRender = () => {
        if (vends === null) {
            return (
                <div>
                    <Table columns={columns} rows={modelListInit()} />
                </div>
            );
        } else if (vends.length == 0) {
            return (
                <div>
                    <Table columns={columns} rows={modelListEmpty()} />
                </div>
            );
        } else {
            return (
                <div>
                    <Table columns={columns} rows={modelList(vends, handleView)} />
                    <Box mt={1} mb={2} style={{ float: "right" }}>
                        {modelPages(pg, handleClick)}
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
                        <SuiTypography variant="h6">{vendTitle.VEND_LIST}</SuiTypography>
                        <Link to={vendPage.VEND_ADD}>
                            <SuiButton buttonColor="secondary">Add Vendor</SuiButton>
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

export default VendList;
