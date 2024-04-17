/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiBadge from "components/SuiBadge";
// Images
import Skeleton from '@mui/material/Skeleton';
import Pagination from '@mui/material/Pagination';
import team1 from 'assets/images/team-1.jpg';
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
function Pimg({ image, name, code }) {
  return (
    <Box display="flex"
      alignItems="center"
      px={2}
      py={0.5}
    >
      <SuiAvatar src={image} alt={name} size="sm" variant="rounded" />
    </Box>
  );
}

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

function Name({ name, code }) {
  return (
    <Box display="flex"
      flexDirection="column"
    >
      <Typography variant="button" fontWeight="medium">
        {name}
      </Typography>
      <Typography variant="caption">
        {code}
      </Typography>
    </Box>
  );
}


function Status({ status }) {
  return (
    <SuiBadge variant="gradient" badgeContent={stat[status].batch} color={stat[status].color} size="extra-small" />
  );
}
const modelList = (list, handleView) => {
  return list.map(({ id, name, code, status, min_qty, avi_qty, expire_time, image }) => {
    return {
      image: <Pimg image={image} name={name} />,
      name: <Name code={code} name={name} />,
      min: <Text text={min_qty} />,
      avi: <Text text={avi_qty} />,
      life: <Text text={expire_time} />,
      status: <Status status={status} />,
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
      image: [
        { "colSpan": "7", style: { textAlign: "center" } },
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
      image: <Skeleton animation="wave" style={{ margin: "5px 10px" }} variant="circular" width={40} height={40} />,
      name: [
        { "colSpan": "6" },
        <Skeleton animation="wave" variant="text" width="80%" height={30} />
      ],
    },
    {
      image: <Skeleton animation="wave" style={{ margin: "5px 10px" }} variant="circular" width={40} height={40} />,
      name: [
        { "colSpan": "6" },
        <Skeleton animation="wave" variant="text" width="70%" height={30} />
      ],
    },
    {
      image: <Skeleton animation="wave" style={{ margin: "5px 10px" }} variant="circular" width={40} height={40} />,
      name: [
        { "colSpan": "6" },
        <Skeleton animation="wave" variant="text" width="90%" height={30} />
      ],
    }
  ]
}



const columns = [
  { name: "image", align: "left" },
  { name: "name", align: "left" },
  { name: "avi", label: "Available", align: "left" },
  { name: "min", align: "left" },
  { name: "life", align: "left" },
  { name: "status", align: "center" },
  { name: "action", align: "center" },
];

const Temp = {
  Status
}


export {
  columns,
  Temp,
  modelList,
  modelListInit,
  modelListEmpty,
  modelPages
};
