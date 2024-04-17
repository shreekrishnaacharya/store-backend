import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import ProgressBar from "components/ProgressBar";

import { getLineChart, getBarChart, getMiniCard } from "../model/list";
import { getDashboard } from "../service";
import { useDispatch, useSelector } from "react-redux";
import { setDashboard } from "redux/action/dboardAction";
function Dashboard() {
  const dboardData = useSelector(state => state.dboard);
  const dispatch = useDispatch();
  async function loadData() {
    await getDashboard().then((res) => {
      if (res.flag) {
        console.log(res.data);
        if (Object.keys(res.data).length) {
          dispatch(setDashboard({
            minicard: res.data.minicard,
            line: getLineChart(res.data.bar),
            bar: getBarChart(res.data.bar[0]),
            ...getMiniCard(res.data)
          }));
        } else {
          dispatch(setDashboard({}));
        }
      }
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  if (dboardData === null || Object.keys(dboardData).length == 0) {
    return (<ProgressBar />);
  }

  const minicard = dboardData.minicard;
  console.log(dboardData);
  return (
    <SuiBox py={3}>
      <SmartFormAdd/>
    </SuiBox>
  );
}


export default Dashboard;
