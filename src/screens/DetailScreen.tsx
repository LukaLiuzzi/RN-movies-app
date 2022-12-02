import { StackScreenProps } from '@react-navigation/stack';
import {
	View,
	Text,
	Image,
	Dimensions,
	StyleSheet,
	ScrollView,
	ActivityIndicator,
} from 'react-native';
import { RootStackParams } from '../navigation/Navigation';
import { StatusBar } from 'expo-status-bar';
import useMovieDetails from '../hooks/useMovieDetails';
import MovieDetails from '../components/MovieDetails';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}
const screenHeight = Dimensions.get('screen').height;

export default function DetailScreen({ route, navigation }: Props) {
	const movie = route.params;
	const uri = `https://image.tmdb.org/t/p/w500${movie?.poster_path}`;
	const { cast, isLoading, movieFull } = useMovieDetails(movie.id);

	return (
		<>
			<StatusBar hidden />
			<ScrollView>
				<View style={styles.imageContainer}>
					<Image source={{ uri }} style={styles.imagePoster} />
				</View>

				<View style={styles.marginContainer}>
					<Text style={styles.subTitle}>{movie.original_title}</Text>
					<Text style={styles.title}>{movie.title}</Text>
				</View>

				{isLoading ? (
					<ActivityIndicator size={30} color='grey' style={{ marginTop: 20 }} />
				) : (
					<MovieDetails movieFull={movieFull!} cast={cast} />
				)}

				{/* Close btn */}
				<View style={styles.backBtn}>
					<TouchableOpacity onPress={() => navigation.pop()}>
						<Ionicons color={'white'} name='arrow-back-outline' size={60} />
					</TouchableOpacity>
				</View>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	imageContainer: {
		width: '100%',
		height: screenHeight * 0.7,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.9,
		shadowRadius: 6.27,

		elevation: 10,
	},
	imagePoster: {
		flex: 1,
		borderBottomLeftRadius: 25,
		borderBottomRightRadius: 25,
	},
	marginContainer: {
		marginHorizontal: 20,
		marginTop: 20,
	},
	subTitle: {
		fontSize: 16,
		opacity: 0.8,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	backBtn: {
		position: 'absolute',
		zIndex: 999,
		elevation: 9,
		top: 20,
		left: 5,
	},
});
