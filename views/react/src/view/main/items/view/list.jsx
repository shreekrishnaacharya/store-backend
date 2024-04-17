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
import { itemPage, itemTitle } from "links";

// Custom styles for the Tables
import styles from "./styles";

// Data

import { columns, modelList, modelListInit, modelListEmpty, modelPages } from "../model/list";
import { getItemList } from "../service";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setItemList } from "redux/action/itemAction";

function ItemList() {
    const classes = styles();
    const history = useHistory();
    const { items, pg } = useSelector(state => state.itemList);
    const dispatch = useDispatch();
    const handleView = (id, name) => {
        history.push({
            pathname: itemPage.ITEM_VIEW,
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
        await getItemList({ page }).then((res) => {
            if (res.flag) {
                if (Object.keys(res.data).length) {
                    dispatch(setItemList({
                        items: res.data,
                        pg: {
                            size: parseInt(res.headers["x-pagination-per-page"]),
                            pages: parseInt(res.headers["x-pagination-page-count"]),
                            current: parseInt(res.headers["x-pagination-current-page"]),
                            total: parseInt(res.headers["x-pagination-total-count"]),
                        }
                    }));
                } else {
                    dispatch(setItemList({
                        items: [],
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
        //     dispatch(setItemList({ items: [], pg: {} }));
        // }
    }, []);

    const TableRender = () => {
        if (items === null) {
            return (
                <div>
                    <Table columns={columns} rows={modelListInit()} />
                </div>
            );
        } else if (items.length == 0) {
            return (
                <div>
                    <Table columns={columns} rows={modelListEmpty()} />
                </div>
            );
        } else {
            return (
                <div>
                    <Table columns={columns} rows={modelList(items, handleView)} />
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
                        <SuiTypography variant="h6">{itemTitle.ITEM_LIST}</SuiTypography>
                        <Link to={itemPage.ITEM_ADD}>
                            <SuiButton buttonColor="secondary">Add Item</SuiButton>
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

export default ItemList;
