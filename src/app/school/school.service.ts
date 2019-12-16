import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
declare var require: any;

@Injectable({
    providedIn: 'root'
  })
  export class SchoolService {
    startBatteryLevel: any;
    startBatteryTime: any;
    endBatteryLevel: any;
    endBatteryTime: any;
    batteryDiff: any;
    dischargeTime: any;
    batteryUsage: any = [];
    avgBatteryUsage: any = [];
    deviceData = require('./../battery.json');
    grouped: any[] = _.groupBy(this.deviceData, 'serialNumber');
    groupedbyBattery: any[] = Object.keys(this.grouped).map(i => this.grouped[i]);
    _subject: Subject<any>;
    constructor() {
        this._subject = new Subject<any>();
       }

    parseData() {
    this.groupedbyBattery.forEach(batteryData => {
    batteryData.forEach((data, index) => {
      let escapeCharge = false;
      if (index === 0) {
        this.startBatteryLevel = data.batteryLevel;
        this.startBatteryTime = new Date(data.timestamp);
      }
      if (escapeCharge && data.batteryLevel > batteryData[index - 1].batteryLevel) {
        this.startBatteryLevel = data.batteryLevel;
        this.startBatteryTime = new Date(data.timestamp);
      } else if (escapeCharge && data.batteryLevel < batteryData[index - 1].batteryLevel) {
        escapeCharge = false;
        this.endBatteryLevel = data.batteryLevel;
        this.endBatteryTime = new Date(data.timestamp);
      } else if (index !== 0 && !escapeCharge && data.batteryLevel > batteryData[index - 1].batteryLevel ) {
        this.endBatteryLevel = batteryData[index - 1].batteryLevel;
        this.endBatteryTime = new Date(batteryData[index - 1].timestamp);
        this.batteryDiff = ((this.startBatteryLevel - this.endBatteryLevel));
        this.dischargeTime = Math.abs(Math.round(((this.endBatteryTime - this.startBatteryTime) / 1000) / 60)) / 60;
        if (this.batteryDiff > 0) {
        this.batteryUsage.push({school: data.academyId, battery: data.serialNumber, perDay: ((this.batteryDiff / this.dischargeTime) * 24)});
        }
        escapeCharge = true;
        this.startBatteryLevel = data.batteryLevel;
        this.startBatteryTime = new Date(data.timestamp);
      }
    });
  });
    const groupByBattery = _.groupBy(this.batteryUsage, 'battery');
    const groupByBatteryArr = Object.keys(groupByBattery).map(i => groupByBattery[i]);
    groupByBatteryArr.forEach(batteryData => {
    let totalperDay = 0;
    batteryData.forEach(element => {
      totalperDay += element.perDay;
    });
    this.avgBatteryUsage.push({avgperDay: totalperDay / batteryData.length, batteryId: batteryData[0].battery, academyId: batteryData[0].school,
                              health: totalperDay / batteryData.length > 0.3 ? 'red' : totalperDay / batteryData.length > 0.2 ? 'yellow' : 'green',
                            index: this.avgBatteryUsage.length + 1});
  });
    this._subject.next(this.avgBatteryUsage);
  }
}
