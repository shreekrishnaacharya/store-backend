
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
const colorList = ["info", "dark", "warning"];
let monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getLineChart = (dataList) => {

  let datasets = [];
  let montdata = [];
  dataList.forEach((val, key) => {
    montdata = [];

    monthList.forEach((month, mkey) => {
      if (val.data.hasOwnProperty(month)) {
        montdata[mkey] = val.data[month];
      } else {
        montdata[mkey] = 0;
      }
    });
    datasets[key] = {
      label: val.name,
      color: colorList[key],
      data: montdata
    }
  });

  return {
    labels: monthList,
    datasets
  };
};

const getMiniCard = (dataL) => {

  let labels = [], data = [];
  dataL.sales.forEach((da, i) => {
    labels[i] = stat[da.sts].batch;
    data[i] = da.amt;
  });

  const salesPie = {
    labels,
    datasets: {
      label: 'Sales Report',
      data,
      hoverOffset: 4,
      backgroundColors: [
        "warning",
        "secondary",
        "success",
        "warning"
        // 'rgb(255, 99, 132)',
        // 'rgb(54, 162, 235)',
        // 'rgb(255, 205, 86)'
      ],
    }
  };

  labels = [], data = [];
  dataL.purchase.forEach((da, i) => {
    labels[i] = stat[da.sts].batch;
    data[i] = da.amt;
  });

  const purchasePie = {
    labels,
    datasets: {
      label: 'Purchase Report',
      data,
      hoverOffset: 4,
      backgroundColors: [
        "info",
        "success",
        "light",
        "dark"
        // 'rgb(255, 99, 132)',
        // 'rgb(54, 162, 235)',
        // 'rgb(255, 205, 86)'
      ],
    }
  };

  return {
    salesPie,
    purchasePie,
    purchase_pay: dataL.purchase_pay.amt,
    sales_pay: dataL.sales_pay.amt
  };
}

const getBarChart = (dataList) => {

  let datasets = {};

  let montdata = [];


  monthList.forEach((month, key) => {
    if (dataList.data.hasOwnProperty(month)) {
      montdata[key] = dataList.data[month];
    } else {
      montdata[key] = 0;
    }
  });

  datasets = {
    label: dataList.name,
    color: colorList[0],
    data: montdata
  }

  return {
    labels: monthList,
    datasets: datasets,
  };
}

export {
  getLineChart,
  getBarChart,
  getMiniCard
}