/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SuiTypography from "components/SuiTypography";
import SuiBadge from "components/SuiBadge";
// Images
import Skeleton from '@mui/material/Skeleton';
import Pagination from '@mui/material/Pagination';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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

function Status({ status }) {
  return (
    <SuiBadge variant="gradient" badgeContent={stat[status].batch} color={stat[status].color} size="extra-small" />
  );
}

const modelList = (list, handleView) => {
  return list.map(({ id, name, phone, email, address }) => {
    return {
      name: <Text text={name} edge={true} />,
      address: <Text text={address} warpLength={20} />,
      action: (
        <a style={{ cursor: "pointer" }} onClick={() => { handleView(id, name) }}>
          <SuiTypography
            variant="caption"
            textColor="primary"
            fontWeight="medium"
          >View</SuiTypography>
        </a>
      ),
    }
  });
}

const modelListEmpty = () => {
  return [
    {
      name: [
        { "colSpan": "3", style: { textAlign: "center" } },
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

// const pageList = ({ pages, active, current }, handleNav) => {
//   let PagesList = [];
//   const pagelist = pages > 10 ? 10 : pages;
//   if (pages > 1) {
//     for (let i = 1; i <= pagelist; i++) {
//       PagesList[i - 1] = (
//         <SuiPagination
//           active={i === current}
//           onClick={handleNav(i, active)}
//           item
//         >
//           {i}
//         </SuiPagination>
//       );
//     }
//   }
//   return PagesList;
// }

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
      name: [
        { "colSpan": "3" },
        <Skeleton animation="wave" variant="text" width="80%" height={30} />
      ],
    },
    {
      name: [
        { "colSpan": "3" },
        <Skeleton animation="wave" variant="text" width="70%" height={30} />
      ],
    },
    {
      name: [
        { "colSpan": "3" },
        <Skeleton animation="wave" variant="text" width="90%" height={30} />
      ],
    }
  ]
}
const Temp = {
  Status
}


const columns = [
  { name: "name", align: "left" },
  { name: "address", align: "left" },
  { name: "action", align: "center" },
];


export {
  columns,
  Temp,
  modelList,
  modelListInit,
  modelListEmpty,
  modelPages
};
