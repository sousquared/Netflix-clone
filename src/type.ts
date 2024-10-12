export type Movie = {
    id: string;
    name: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
  };

export type ApiResponse = {
    results: Movie[];
}
