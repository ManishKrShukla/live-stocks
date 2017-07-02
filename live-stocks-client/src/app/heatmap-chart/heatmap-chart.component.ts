import {OnChanges, Input, Component } from '@angular/core';

declare var Highcharts;

@Component({
  selector: 'app-heatmap-chart',
  templateUrl: './heatmap-chart.component.html',
  styleUrls: ['./heatmap-chart.component.css']
})
export class HeatmapChartComponent implements OnChanges {
  @Input() identifier;
  @Input() title;
  @Input() maxRows = -1;
  @Input() categories;
  @Input() data;
  @Input() yAxisTitle;

  private callThreshold;
  private chartCmp = null;

  constructor() {

  }

  ngOnChanges(changes) {
    if (this.callThreshold) {
        clearTimeout(this.callThreshold);
    }

    this.callThreshold = setTimeout(() => {
        this.data && this.data.length ? this.initChart() : '';
    }, 500);
  }

  updateData() {
    this.chartCmp.series.forEach((element, index) => {
        element.setData(this.data[index].data);
    });

    this.chartCmp.xAxis[0].setCategories(this.categories, true, true);
  }

  initChart() {
        
    // This logic can be employed to show only last n updates. Having a very heavy chart can hamper performance.

    // if (this.maxRows !== -1 && this.data[0].data.length > this.maxRows) {
    //     this.data.forEach((row) => {
    //         let end = row.data.length - this.maxRows;
    //         row.data.splice(0, end);
    //     });

    //     this.categories.splice(0, this.categories.length - this.maxRows);
    // }

    if (this.chartCmp) {
        this.updateData();
    } else {
        this.chartCmp = Highcharts.chart(`container-${this.identifier}`, {
            chart: {
                type: 'line'
            },
            title: {
                text: this.title
            },
            tooltip: {
                crosshairs: true,
                animation: true,
                shared: true,
            },
            xAxis: {
                categories: this.categories
            },
            yAxis: {
                title: {
                    text: this.yAxisTitle
                }
            },
            series: this.data
        });
    }
  }
}
