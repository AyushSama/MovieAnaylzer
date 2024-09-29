import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http : HttpClient) { }

  host = environment.rapidApiHost;
  apiKey = environment.rapidApiKey;
  apiUrl = environment.rapidApiUrl;

  headers = new HttpHeaders().append("x-rapidapi-key",this.apiKey).append("x-rapidapi-host",this.host);

  getMovies(){
    try {
      return this.http.get(this.apiUrl,{headers:this.headers});
    } catch (error) {
        throw new Error();
    }
  }

}
