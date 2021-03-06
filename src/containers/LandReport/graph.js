import React from 'react';
import { Pie } from 'react-chartjs-2';


function PieChart(props) {
    const { reportdetails } = props;
    console.log("reportdetails",reportdetails.Report[0])
    const data = {
      labels: ['Cultivation', 'Habitation', 'Agriculture', 'Road', 'Water', 'Forest_Coverage'],
      datasets: [
        {
          label: '# of Votes',
          data: [reportdetails.Report[0].cultivation, reportdetails.Report[0].habitation, reportdetails.Report[0].agriculture, reportdetails.Report[0].road, reportdetails.Report[0].water, reportdetails.Report[0].forest_coverage],
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
            <Pie data={data} />
        </React.Fragment>
    )
};

export default PieChart;