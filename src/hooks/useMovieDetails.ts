import { useEffect, useState } from 'react';
import { movieDB } from '../api/movieDB';
import { Cast, CreditsResponse } from '../interfaces/creditsInterfaces';
import { MovieFull } from '../interfaces/movieInterfaces';

interface MovieDetails {
	isLoading: boolean;
	movieFull?: MovieFull;
	cast: Cast[];
}

export default function useMovieDetails(movieId: number) {
	const [state, setState] = useState<MovieDetails>({
		isLoading: true,
		movieFull: undefined,
		cast: [],
	});

	const getMovieDetails = async () => {
		const movieDetailsPromise = await movieDB.get<MovieFull>(`/${movieId}`);
		const castPromise = await movieDB.get<CreditsResponse>(
			`/${movieId}/credits`
		);

		const [movieDetailsResponse, castPromiseResponse] = await Promise.all([
			movieDetailsPromise,
			castPromise,
		]);

		setState({
			isLoading: false,
			movieFull: movieDetailsResponse.data,
			cast: castPromiseResponse.data.cast,
		});
	};

	useEffect(() => {
		getMovieDetails();
	}, []);

	return {
		...state,
	};
}
