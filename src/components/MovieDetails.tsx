import { View, Text, Dimensions, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MovieFull } from '../interfaces/movieInterfaces';
import { Cast } from '../interfaces/creditsInterfaces';
import ActorCard from './ActorCard';

interface Props {
	movieFull: MovieFull;
	cast: Cast[];
}

const screenWidth = Dimensions.get('screen').width;

export default function MovieDetails({ movieFull, cast }: Props) {
	return (
		<>
			{/* Details */}
			<View style={{ marginHorizontal: 20 }}>
				<View style={{ flexDirection: 'row', width: screenWidth - 50 }}>
					<Ionicons name='star-outline' size={16} color='grey' />
					<Text> {movieFull.vote_average}</Text>
					<Text style={{ marginLeft: 5 }}>
						{' '}
						- {movieFull.genres.map((g) => g.name).join(', ')}
					</Text>
				</View>

				{/* Storyline */}
				<Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
					Historia
				</Text>
				<Text style={{ fontSize: 16 }}>{movieFull.overview}</Text>

				{/* Budget */}
				<Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
					Presupuesto
				</Text>
				<Text style={{ fontSize: 18 }}>
					{movieFull.budget.toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD',
					})}
				</Text>

				{/* Cast */}
				<View style={{ marginTop: 10 }}>
					<Text
						style={{
							fontSize: 23,
							marginTop: 10,
							fontWeight: 'bold',
						}}
					>
						Actores
					</Text>
					<FlatList
						data={cast}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => <ActorCard actor={item} />}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						style={{ marginTop: 10, height: 65 }}
					/>
				</View>
			</View>
		</>
	);
}
