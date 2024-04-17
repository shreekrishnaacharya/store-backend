// @mui material components
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// Soft UI Dashboard React components
import Box from "@mui/material/Box";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import { useSnackbar } from 'notistack';
import { deleteAlert } from "_services";
// Soft UI Dashboard React example components
import Table from "layouts/Table";
import { categoryPage, categoryTitle } from "links";

// Custom styles for the Tables
import styles from "./styles";


import { columns, modelList, modelListInit, modelListEmpty, modelPages } from "../model/list";
import { getCategoryList, getCategoryDelete } from "../service";
import { Link } from 'react-router-dom';

function CategoryList() {
    const { enqueueSnackbar } = useSnackbar();
    const [catList, setCatList] = useState({
        categorys: null,
        pg: {
            size: 0,
            pages: 0,
            current: 0,
            total: 0,
        }
    });

    const { categorys, pg } = catList;
    const classes = styles();
    const history = useHistory();
    const handleUpdate = (id, name) => {
        history.push({
            pathname: categoryPage.CATEGORY_UPDATE,
            search: "?" + (name.replace(" ", "-").toLowerCase()),
            state: {
                id,
                name
            }
        });
    }

    const deleteCategory = (id, name) => {
        const deleteHandle = async () => {
            return getCategoryDelete(id);
        }
        deleteAlert({ title: "Are you sure?" }, deleteHandle)
            .then((res) => {
                if (res === null) {
                    return;
                }
                if (res.flag) {
                    enqueueSnackbar("Category delete success", {
                        variant: 'success',
                    });
                    loadData(pg.current);
                } else {
                    enqueueSnackbar("Category delete failed", {
                        variant: 'error',
                    });
                }
            });
    }

    const handleClick = (e, current) => {
        if (pg.current != current) {
            loadData(current);
        }
    }

    async function loadData(page) {
        await getCategoryList({ page }).then((res) => {
            if (res.flag) {
                if (Object.keys(res.data).length) {
                    setCatList({
                        categorys: res.data,
                        pg: {
                            size: parseInt(res.headers["x-pagination-per-page"]),
                            pages: parseInt(res.headers["x-pagination-page-count"]),
                            current: parseInt(res.headers["x-pagination-current-page"]),
                            total: parseInt(res.headers["x-pagination-total-count"]),
                        }
                    });
                } else {
                    setCatList({
                        categorys: [],
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
        if (categorys === null) {
            return (
                <div>
                    <Table columns={columns} rows={modelListInit()} />
                </div>
            );
        } else if (categorys.length == 0) {
            return (
                <div>
                    <Table columns={columns} rows={modelListEmpty()} />
                </div>
            );
        } else {
            return (
                <div>
                    <Table columns={columns} rows={modelList(categorys, handleUpdate, deleteCategory)} />
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
                        <SuiTypography variant="h6">{categoryTitle.CATEGORY_LIST}</SuiTypography>
                        <Link to={categoryPage.CATEGORY_ADD}>
                            <SuiButton buttonColor="secondary">Add Category</SuiButton>
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

export default CategoryList;
