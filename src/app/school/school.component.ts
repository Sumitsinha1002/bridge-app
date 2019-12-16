import { Component, OnInit } from '@angular/core';
import { SchoolService } from './school.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
  title = 'bridge-app';
  constructor(private schoolService: SchoolService) { }



  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{ stacked: true ,
        scaleLabel: {
          display: true,
          labelString: 'Academy Id'
        }
      }],
      yAxes: [{ stacked: true, ticks: {
        beginAtZero: true,
      },
      scaleLabel: {
        display: true,
        labelString: 'Count'
      }
     }]
    },
    tooltips: {
      displayColors: true,
      callbacks: {
        mode: 'x',
      },

    },

  };

    public mbarChartLabels: string[];
    public barChartType = 'bar';
    public barChartLegend = true;
    public barChartData: any[];

    public chartHovered(e: any): void {
      e.event.target.style.cursor = 'pointer';
    }

    ngOnInit() {
      this.schoolService._subject.subscribe((data) => {
        const groupBySchool = _.groupBy(data, 'academyId');
        const groupBySchoolArr = Object.values(groupBySchool);
        let unhealthyBattery = [];
        let healthyBattery = [];
        // Formatting Data for chart
        for (let i = 0; i < groupBySchoolArr.length; i++) {
           for (let j = 0; j < Object.values(groupBySchoolArr[i]).length; j++) {
             if (groupBySchoolArr[i][j].avgperDay > 0.3 && unhealthyBattery[groupBySchoolArr[i][j].academyId]) {
              unhealthyBattery[groupBySchoolArr[i][j].academyId].push(groupBySchoolArr[i][j]);
             } else if (groupBySchoolArr[i][j].avgperDay > 0.3 && !unhealthyBattery[groupBySchoolArr[i][j].academyId]) {
              unhealthyBattery[groupBySchoolArr[i][j].academyId] = [];
              unhealthyBattery[groupBySchoolArr[i][j].academyId].push(groupBySchoolArr[i][j]);
            } else if (groupBySchoolArr[i][j].avgperDay < 0.3 && healthyBattery[groupBySchoolArr[i][j].academyId]) {
              healthyBattery[groupBySchoolArr[i][j].academyId].push(groupBySchoolArr[i][j]);
           } else if (groupBySchoolArr[i][j].avgperDay < 0.3 && !healthyBattery[groupBySchoolArr[i][j].academyId]) {
            healthyBattery[groupBySchoolArr[i][j].academyId] = [];
            healthyBattery[groupBySchoolArr[i][j].academyId].push(groupBySchoolArr[i][j]);
          }
         }
           healthyBattery = healthyBattery.filter(Boolean);
           unhealthyBattery = unhealthyBattery.filter(Boolean);
           this.mbarChartLabels = unhealthyBattery.map((data) => data[0].academyId);
           this.barChartData = [
          {data: healthyBattery.map((data) => data.length), label: 'Healthy Battery', backgroundColor: '#45c490', hoverBackgroundColor: '#45c490'},
          {data: unhealthyBattery.map((data) => data.length), label: 'Unhealthy Battery', backgroundColor: '#e04a4a', hoverBackgroundColor: '#e04a4a'},
        ];
      }

    });
      this.schoolService.parseData();

    }

}
