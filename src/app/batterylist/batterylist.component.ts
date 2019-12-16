import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { SchoolService } from '../school/school.service';

@Component({
  selector: 'app-batterylist',
  templateUrl: './batterylist.component.html',
  styleUrls: ['./batterylist.component.css']
})
export class BatterylistComponent implements OnInit {
  displayedColumns = ['number', 'batteryId', 'academyId', 'health'];
  batteryList: any;
  dataSource: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(public schoolService: SchoolService) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.schoolService.parseData();
    this.schoolService._subject.subscribe((data) => {
      this.batteryList = data;
      console.log(this.batteryList);
      this.dataSource = new MatTableDataSource<Battery>(this.batteryList);
    });
  }

}

export interface Battery {
  batteryId: number;
  academyId: number;
  health: number;
}
