/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SuiTypography from "components/SuiTypography";
import SuiBadge from "components/SuiBadge";
// Images
import Skeleton from '@mui/material/Skeleton';
import Pagination from '@mui/material/Pagination';
import Box from "@mui/material/Box";

const stat = {
  "0": {
    "batch": "Pending",
    "color": "info"
  },
  "1": {
    "batch": "Ordered",
    "color": "primary"
  },
  "2": {
    "batch": "Received",
    "color": "success"
  },
  "3": {
    "batch": "Return",
    "color": "error"
  }
};

const pstat = {
  "0": {
    "batch": "Pending",
    "color": "warning"
  },
  "1": {
    "batch": "Partial",
    "color": "primary"
  },
  "2": {
    "batch": "Paid",
    "color": "success"
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

function Pstatus({ status }) {
  return (
    <SuiBadge variant="gradient" badgeContent={pstat[status].batch} color={pstat[status].color} size="extra-small" />
  );
}

const modelList = (list, handleView) => {
  return list.map(({ id, date, ref_no, customer, pstatus, pay_amt, total_amt, status }) => {
    return {
      pdate: <Text text={date} />,
      refno: <Text text={ref_no} />,
      customer: <Text text={customer} />,
      status: <Status status={status} />,
      amt: <Text text={total_amt} />,
      pay_amt: <Text text={pay_amt} />,
      balance: <Text text={(total_amt - pay_amt)} />,
      pstatus: <Pstatus status={pstatus} />,
      action: (
        <a style={{ cursor: "pointer" }} onClick={() => { handleView(id, ref_no) }}>
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
      pdate: [
        { "colSpan": "9", style: { textAlign: "center" } },
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
      pdate: [
        { "colSpan": "9" },
        <Skeleton animation="wave" variant="text" width="80%" height={30} />
      ],
    },
    {
      pdate: [
        { "colSpan": "9" },
        <Skeleton animation="wave" variant="text" width="70%" height={30} />
      ],
    },
    {
      pdate: [
        { "colSpan": "9" },
        <Skeleton animation="wave" variant="text" width="90%" height={30} />
      ],
    }
  ]
}



const columns = [
  { name: "pdate", label: "DATE", align: "left" },
  { name: "refno", label: "Ref No.", align: "left" },
  { name: "customer", align: "left" },
  { name: "status", align: "center" },
  { name: "amt", label: "AMOUNT", align: "left" },
  { name: "pay_amt", label: "PAID", align: "left" },
  { name: "balance", align: "left" },
  { name: "pstatus", label: "PAY STATUS", align: "center" },
  { name: "action", align: "center" },
];

const Temp = {
  Status,
  Pstatus
}


export {
  columns,
  Temp,
  modelList,
  modelListInit,
  modelListEmpty,
  modelPages
};
