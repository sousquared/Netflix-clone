import { useEffect, useState } from "react";
import axios from "../../axios";
import { requests } from "../../request";
import { Movie } from "../../type";
import { ApiResponse } from "../../type";

export const useProps = (fetchUrl: string) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [trailerUrl, setTrailerUrl] = useState<string | null>("");

    // ①APIの取得はuseEffectを使う
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get<ApiResponse>(fetchUrl);
            // ②データの整形
            const movies = request.data.results.map((movie: Movie) => ({
                id: movie.id,
                name: movie.name,
                poster_path: movie.poster_path,
                backdrop_path: movie.backdrop_path,
            }));
            setMovies(movies.map(movie => ({
                ...movie,
                overview: '' // または適切なデフォルト値
            })));
            return request;
        };
        fetchData();
    }, [fetchUrl]);  // 依存配列はfetchUrl. fetchUrlが変更されたら再度APIを取得

    const handleClick = async (movie: Movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            const moviePlayUrl = await axios.get<{ results: { key: string }[] }>(requests.fetchMovieVideos(movie.id));
            setTrailerUrl(moviePlayUrl.data.results[0]?.key);
        }
    };

    return {movies, trailerUrl, handleClick};
};
