import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Movie } from '../../Interfaces/Movie';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-analyse',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.scss']
})
export class AnalyseComponent implements OnInit {

  movieRawData: Movie[] = [];
  Highcharts: typeof Highcharts = Highcharts;  
  chartOptions!: Highcharts.Options;
  error: string | null = null;
  moviesByYear = new Map<number, number>();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getMovies()
      .subscribe({
        next: (res: any) => {
          this.movieRawData = res;
          this.movieRawData.forEach((movie) => {
            const year = movie.year;
            const count = this.moviesByYear.get(year) || 0;
            this.moviesByYear.set(year, count + 1);
          });
          const chartData = Array.from(this.moviesByYear.entries()).map(([year, count]) => ({
            x: year,
            y: count
          }));
          this.chartOptions = {
            chart: {
              type: 'column' // You can choose other chart types like bar, line, etc.
            },
            title: {
              text: 'Year by Movie/Series Count'
            },
            xAxis: {
              title: {
                text: 'Year'
              }
            },
            yAxis: {
              title: {
                text: 'Count'
              }
            },
            series: [{
              name: 'Movies/Series',
              type: 'column', // Add the type property here
              data: chartData
            }]
          };
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching movies:', error);
          this.error = 'Failed to load movies. Please try again later.'; // Inform user about error
        }
      });
  }
}