import {ViewContainerRef, AfterViewInit, Component, OnInit } from '@angular/core';
import {$WebSocket} from 'angular2-websocket/angular2-websocket'
import { ToastrService } from 'ngx-toastr';
import * as _ from "lodash";
import * as moment from 'moment';

import {WS_SRC} from './live-stocks.constants';

@Component({
  selector: 'app-live-stocks',
  templateUrl: './live-stocks.component.html',
  styleUrls: ['./live-stocks.component.css']
})
export class LiveStocksComponent implements AfterViewInit {
  public rows = [];
  public timeLabels = [];
  public lastUpdate = null;
  public isChartView = true;

  private timeOfUpdates = [];
  private availableStocks = [];
  private updatesSoFar = 0;
  private wsSource;

  constructor(private toastrService: ToastrService) { 
    this.wsSource = new $WebSocket(WS_SRC);

    moment.lang('en', {
      longDateFormat : {
            LT: "h:mm:ss A",
            L: "MM/DD/YYYY",
            l: "M/D/YYYY",
            LL: "MMMM Do YYYY",
            ll: "MMM D YYYY",
            LLL: "MMMM Do YYYY LT",
            lll: "MMM D YYYY LT",
            LLLL: "dddd, MMMM Do YYYY LT",
            llll: "ddd, MMM D YYYY LT"
        }
    });
  }

  ngAfterViewInit() {
    this.wsSource.onMessage((msg: MessageEvent) => {
        this.parseMessage(msg.data);
    });
  }

  toggleView() {
    this.isChartView = !this.isChartView;
  }

  parseMessage(msg) {
    this.lastUpdate = moment(Date.now()).calendar();

    try {
      let response = JSON.parse(msg);

      if (response.message) {
        this.toastrService[response.type](response.message);
      } else if (response.data) {
        this.timeOfUpdates.push(Date.now());
        this.updatesSoFar++;

        response.data.forEach(element => {
          
          if (this.availableStocks.indexOf(element[0]) !== -1) {
            let index = _.findIndex(this.rows, {name: element[0]});
            let lastElement = this.rows[index].data[this.rows[index].data.length - 1];
            
            if (lastElement > element[1]) {
              this.rows[index].state = "positive";
            } else {
              this.rows[index].state = "negative";
            }

            if (this.rows[index].data.length - this.updatesSoFar > 1) {
              this.rows[index].data = this.rows[index].data.concat(new Array(this.rows[index].data.length - this.updatesSoFar - 1));
            }

            this.rows[index].lastUpdated = moment();
            this.rows[index].data.push(element[1]);
          } else {
            this.availableStocks.push(element[0]);
            let newStock = {
              name: element[0],
              data: []
            };

            newStock.data = new Array(this.updatesSoFar - 1).fill(null);
            newStock.data.push(element[1]);

            this.rows.push(newStock);
            this.rows[this.rows.length - 1].lastUpdated = moment();
          }
        });
      }

      this.rows.forEach((row) => {
        row.lastUpdatedTime = row.lastUpdated.fromNow();
      });

      this.timeLabels = [];

      this.timeOfUpdates.forEach(time => {
        this.timeLabels.push(moment(time).calendar());
      });

    } catch(error) {
     this.toastrService.error("There was some error connecting to the stocks server. please try again."); 
    }

  }

}
