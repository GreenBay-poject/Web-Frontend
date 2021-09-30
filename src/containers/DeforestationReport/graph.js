import React from 'react';
import { Pie } from 'react-chartjs-2';

import Grid from '@material-ui/core/Grid';

function PieChart(props) {
    const { reportdetails } = props;
    console.log("reportdetails",reportdetails.Report[0])
    const data = {
      labels: Object.keys(reportdetails.Report[0]),
      datasets: [
        {
          label: '# of Votes',
          data: Object.values(reportdetails.Report[0]),
          backgroundColor: [
            'rgb(192, 202, 51)',
            'rgb(255, 236, 179)',
            'rgb(102, 187, 106)',
            'rgb(189, 189, 189)',
            'rgb(179, 229, 252)',
            'rgb(200, 230, 201)',
          ],
          borderColor: [
            'rgb(0, 121, 107)',
            'rgb(0, 121, 107)',
            'rgb(0, 121, 107)',
            'rgb(0, 121, 107)',
            'rgb(0, 121, 107)',
            'rgb(0, 121, 107)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const data2 = {
      labels: Object.keys(reportdetails.Report[2]),
      datasets: [
        {
          label: '# of Votes',
          data: Object.values(reportdetails.Report[2]),
          backgroundColor: [
            'rgb(192, 202, 51)',
            'rgb(255, 236, 179)',
            'rgb(102, 187, 106)',
            'rgb(189, 189, 189)',
            'rgb(179, 229, 252)',
            'rgb(200, 230, 201)',
          ],
          borderColor: [
            'rgb(0, 121, 107)',
            'rgb(0, 121, 107)',
            'rgb(0, 121, 107)',
            'rgb(0, 121, 107)',
            'rgb(0, 121, 107)',
            'rgb(0, 121, 107)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return(
        <React.Fragment>
          <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Pie data={data} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Pie data={data2} />
                  </Grid>
          </Grid>
        </React.Fragment>
    )
};

export default PieChart;