export interface Movie {
    rank: number;
    title: string;
    description: string;
    image: string;
    big_image: string;
    genre: string[]; // Array of strings to hold genres
    thumbnail: string;
    rating: string; // Consider changing to number if it will always be numeric
    id: string;
    year: number;
    imdbid: string;
    imdb_link: string;
  }
  