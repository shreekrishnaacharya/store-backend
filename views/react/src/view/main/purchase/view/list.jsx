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
import { purchasePage, purchaseTitle } from "links";

// Custom styles for the Tables
import styles from "./styles";

// Data

import { columns, modelList, modelListInit, modelListEmpty, modelPages } from "../model/list";
import { getPurchaseList } from "../service";
import { Link } from 'react-router-dom';
// import { setPurchaseList } from "redux/action/purchaseAction";

function PurchaseList() {
    const classes = styles();
    const history = useHistory();
    const initPurchase = {
        purchases: null,
        pg: {
            size: 0,
            pages: 0,
            current: 0,
            total: 0,
        }
    };
    const [purcuData, setPurchase] = useState(initPurchase);
    const { purchases, pg } = purcuData;
    const handleView = (id, name) => {
        history.push({
            pathname: purchasePage.PURCHASE_VIEW,
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
        await getPurchaseList({ page }).then((res) => {
            if (res.flag) {
                if (Object.keys(res.data).length) {
                    setPurchase({
                        purchases: res.data,
                        pg: {
                            size: parseInt(res.headers["x-pagination-per-page"]),
                            pages: parseInt(res.headers["x-pagination-page-count"]),
                            current: parseInt(res.headers["x-pagination-current-page"]),
                            total: parseInt(res.headers["x-pagination-total-count"]),
                        }
                    });
                } else {
                    setPurchase({
                        purchases: [],
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
        return () => {
            setPurchase({ purchases: [], pg: {} });
        }
    }, []);

    const TableRender = () => {
        if (purchases === null) {
            return (
                <div>
                    <Table columns={columns} rows={modelListInit()} />
                </div>
            );
        } else if (purchases.length == 0) {
            return (
                <div>
                    <Table columns={columns} rows={modelListEmpty()} />
                </div>
            );
        } else {
            return (
                <div>
                    <Table columns={columns} rows={modelList(purchases, handleView)} />
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
                    <Box display="flex" justifyContent="space-between" alignPurchases="center" p={3}>
                        <SuiTypography variant="h6">{purchaseTitle.PURCHASE_LIST}</SuiTypography>
                        <Link to={purchasePage.PURCHASE_ADD}>
                            <SuiButton buttonColor="secondary">Add Purchase</SuiButton>
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

export default PurchaseList;