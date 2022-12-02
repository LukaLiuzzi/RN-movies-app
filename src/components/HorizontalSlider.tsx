import { View, Text, FlatList } from 'react-native';
import { Movie } from '../interfaces/movieInterfaces';
import MoviePoster from './MoviePoster';

interface Props {
	title?: string;
	movies: Movie[];
}

export default function HorizontalSlider({ title, movies }: Props) {
	return (
		<View
			style={{
				height: title ? 270 : 230,
			}}
		>
			{title && (
				<Text
					style={{
						fontSize: 30,
						fontWeight: 'bold',
						paddingHorizontal: 20,
					}}
				>
					{title}
				</Text>
			)}
			<FlatList
				data={movies}
				renderItem={({ item }) => (
					<MoviePoster movie={item} height={220} width={140} />
				)}
				keyExtractor={(item) => item.id.toString()}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
}
