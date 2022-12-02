import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Movie } from '../interfaces/movieInterfaces';
import { RootStackParams } from '../navigation/Navigation';

interface Props {
	movie: Movie;
	height?: number;
	width?: number;
}

export default function MoviePoster({
	movie,
	height = 350,
	width = 200,
}: Props) {
	const uri = `https://image.tmdb.org/t/p/w500${movie?.poster_path}`;

	const { navigate } = useNavigation<StackNavigationProp<RootStackParams>>();

	return (
		<TouchableOpacity
			onPress={() => navigate('DetailScreen', movie)}
			activeOpacity={0.8}
			style={{
				width,
				height,
				marginHorizontal: 2,
				paddingHorizontal: 7,
				paddingBottom: 10,
			}}
		>
			<View style={styles.imageContainer}>
				<Image source={{ uri }} style={styles.image} />
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	imageContainer: {
		flex: 1,
		paddingTop: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.9,
		shadowRadius: 6.27,

		elevation: 10,
	},

	image: {
		flex: 1,
		borderRadius: 18,
	},
});
