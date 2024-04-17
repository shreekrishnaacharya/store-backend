/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SuiTypography from "components/SuiTypography";
import SuiBadge from "components/SuiBadge";
// Images
import Skeleton from '@mui/material/Skeleton';
import Pagination from '@mui/material/Pagination';
import Box from "@mui/material/Box";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const stat = {
  "1": {
    "batch": "active",
    "color": "success"
  },
  "0": {
    "batch": "inactive",
    "color": "secondary"
  }
};

function Text({ text, edge, warpLength }) {
  return (
    <Box display="flex"
      pl={edge ? 2.5 : 0.5}
      pr={edge ? 2.5 : 0.5}
      pt={1.5}
      pb={1.25}
    >
      <SuiTypography
        variant="caption"
        fontWeight="medium"
        warpLength={warpLength}>
        {text}
      </SuiTypography>
    </Box>
  );
}

const modelList = (list, handleUpdate, handleDelete) => {
  return list.map(({ id, name, code }) => {
    return {
      id: <Text text={id} edge={true} />,
      name: <Text text={name} />,
      code: <Text text={code} />,
      action: (
        <Box display="flex"
          pl={2.5}
          pr={2.5}
          pt={1.5}
          pb={1.25}
          sx={{ justifyContent: "center" }}
        >
          <a style={{ cursor: "pointer", }} onClick={() => { handleUpdate(id, name) }}>
            <EditIcon size="20px" />
          </a >
          <a style={{ cursor: "pointer", color: "red", marginLeft: "10px" }} onClick={() => { handleDelete(id, name) }}>
            <DeleteIcon size="20px" />
          </a>
        </Box>
      ),
    }
  });
}

const modelListEmpty = () => {
  return [
    {
      id: [
        { "colSpan": "4", style: { textAlign: "center" } },
        <SuiTypography
          component="span"
          textColor="secondary"
          fontWeight="medium"
          p={20}
        >No data found</SuiTypography>
      ],
    }
  ]
}

const modelPages = (pagination, handleNav) => {
  return (
    <Pagination variant="outlined"
      count={pagination.pages}
      page={pagination.current}
      color="primary"
      siblingCount={2}
      boundaryCount={2}
      onChange={handleNav}
    />
  );
};

const modelListInit = () => {
  return [
    {
      id: [
        { "colSpan": "4" },
        <Skeleton animation="wave" variant="text" width="80%" height={30} />
      ],
    },
    {
      id: [
        { "colSpan": "4" },
        <Skeleton animation="wave" variant="text" width="70%" height={30} />
      ],
    },
    {
      id: [
        { "colSpan": "4" },
        <Skeleton animation="wave" variant="text" width="90%" height={30} />
      ],
    }
  ]
}


const columns = [
  { name: "id", align: "left" },
  { name: "name", align: "left" },
  { name: "code", align: "left" },
  { name: "action", align: "center" },
];


export {
  columns,
  modelList,
  modelListInit,
  modelListEmpty,
  modelPages
};
