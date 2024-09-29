import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Movie } from '../../Interfaces/Movie';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { Movies } from '../../Constants/Movies.constant';

@Component({
  selector: 'app-analyse',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.scss']
})
export class AnalyseComponent implements OnInit {

  movieRawData = Movies;
  Highcharts: typeof Highcharts = Highcharts;  
  chartOptionMoviesByYear!: Highcharts.Options;
  chartOptionAvgImdbRating!:Highcharts.Options;
  chartOptionGenreWiseAvgRuntime !:Highcharts.Options;
  error: string | null = null;
  moviesByYear = new Map<number, number>();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    // this.getMovies();
    this.populateChartOptionMoviesByYear();
    this.populateChartOptionAvgImdbRating();
    // this.populateChartOptionGenreWiseAvgRuntime();
  }

  populateChartOptionGenreWiseAvgRuntime(){

  }

  populateChartOptionAvgImdbRating() {
    const moviesByYearRating = new Map<number, { totalRating: number, count: number }>();
  
    this.movieRawData.forEach((movie) => {
      const year = movie.year;
      const rating = movie.rating; // Assuming you have an imdb_rating property
  
      const yearData = moviesByYearRating.get(year) || { totalRating: 0, count: 0 };
      yearData.totalRating += Number(rating);
      yearData.count++;
      moviesByYearRating.set(year, yearData);
    });
  
    const chartData = Array.from(moviesByYearRating.entries()).map(([year, { totalRating, count }]) => ({
      x: year,
      y: totalRating / count
    }));
  
    this.chartOptionAvgImdbRating = {
      title: {
        text: 'Year wise Avg imdbRating'
      },
      xAxis: {
        title: {
          text: 'Year'
        }
      },
      yAxis: {
        title: {
          text: 'Average IMDb Rating'
        }
      },
      series: [{
        name: 'Average IMDb Rating',
        type: 'scatter', // Use line chart for average values
        data: chartData,
        color: 'red'
      }]
    };
  }

  populateChartOptionMoviesByYear(){
    this.movieRawData.forEach((movie) => {
      const year = movie.year;
      const count = this.moviesByYear.get(year) || 0;
      this.moviesByYear.set(year, count + 1);
    });
    const chartData = Array.from(this.moviesByYear.entries()).map(([year, count]) => ({
      x: year,
      y: count
    }));
    this.chartOptionMoviesByYear = {
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
  }

  getMovies() {
    this.movieService.getMovies()
      .subscribe({
        next: (res: any) => {
          this.movieRawData = res;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching movies:', error);
          alert(error.message);
          this.error = 'Failed to load movies. Please try again later.'; // Inform user about error
        }
      });
  }
}