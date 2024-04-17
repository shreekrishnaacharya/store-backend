/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiBadge from "components/SuiBadge";
// Images
import Skeleton from '@mui/material/Skeleton';
import Pagination from '@mui/material/Pagination';
import userIcon from 'assets/images/user.png';
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
function Pimg({ image, name }) {
  return (
    <Box display="flex"
      alignItems="center"
      px={2}
      py={0.5}
    >
      <SuiAvatar src={image ? image.image : userIcon} alt={name} size="sm" variant="rounded" />
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

function Status({ status }) {
  return (
    <SuiBadge variant="gradient" badgeContent={stat[status].batch} color={stat[status].color} size="extra-small" />
  );
}

function Contacts({ contacts }) {
  return contacts.map(({ type, phone }) => {
    return (
      <SuiTypography>{type}&nbsp;:&nbsp;{phone};</SuiTypography>
    );
  });
}

const modelList = (list, handleView) => {
  return list.map(({ id, name, contacts, address }) => {
    return {
      image: <Pimg image={contacts} name={name} />,
      name: <Text text={name} />,
      address: <Text text={address} wordLength={20} />,
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
      image: <Skeleton animation="wave" style={{ margin: "5px 10px" }} variant="circular" width={40} height={40} />,
      name: [
        { "colSpan": "4" },
        <Skeleton animation="wave" variant="text" width="80%" height={30} />
      ],
    },
    {
      image: <Skeleton animation="wave" style={{ margin: "5px 10px" }} variant="circular" width={40} height={40} />,
      name: [
        { "colSpan": "4" },
        <Skeleton animation="wave" variant="text" width="70%" height={30} />
      ],
    },
    {
      image: <Skeleton animation="wave" style={{ margin: "5px 10px" }} variant="circular" width={40} height={40} />,
      name: [
        { "colSpan": "4" },
        <Skeleton animation="wave" variant="text" width="90%" height={30} />
      ],
    }
  ]
}



const columns = [
  { name: "image", align: "left" },
  { name: "name", align: "left" },
  { name: "address", align: "left" },
  { name: "action", align: "center" },
];

const Temp = {
  Status,
  Contacts
}


export {
  columns,
  Temp,
  modelList,
  modelListInit,
  modelListEmpty,
  modelPages
};
