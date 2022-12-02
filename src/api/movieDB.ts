import axios from 'axios';

export const movieDB = axios.create({
	baseURL: 'https://api.themoviedb.org/3/movie',
	params: {
		api_key: 'e11854d9b2dd14d971cfa32f0cc594d7',
		language: 'es-ES',
	},
});
