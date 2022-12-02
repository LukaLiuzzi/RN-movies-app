import { movieDB } from '../api/movieDB';
import { Movie, MovieDBMoviesResponse } from '../interfaces/movieInterfaces';
import { useEffect, useState } from 'react';

interface MoviesState {
	nowPlaying: Movie[];
	popular: Movie[];
	topRated: Movie[];
	upcoming: Movie[];
}
export function useMovies() {
	const [movies, setMovies] = useState<MoviesState>({
		nowPlaying: [],
		popular: [],
		topRated: [],
		upcoming: [],
	});
	const [isLoading, setIsLoading] = useState(true);

	const getNowPlaying = async () => {
		await Promise.all([
			movieDB.get<MovieDBMoviesResponse>('/now_playing'),
			movieDB.get<MovieDBMoviesResponse>('/popular'),
			movieDB.get<MovieDBMoviesResponse>('/top_rated'),
			movieDB.get<MovieDBMoviesResponse>('/upcoming'),
		]).then((responses) => {
			setMovies({
				nowPlaying: responses[0].data.results,
				popular: responses[1].data.results,
				topRated: responses[2].data.results,
				upcoming: responses[3].data.results,
			});
		});
	};

	useEffect(() => {
		getNowPlaying();
		setIsLoading(false);
	}, []);

	return {
		...movies,
		isLoading,
	};
}
