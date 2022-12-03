import Carousel from 'react-native-snap-carousel';
import {
	View,
	ActivityIndicator,
	useWindowDimensions,
	Text,
	ScrollView,
} from 'react-native';
import MoviePoster from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HorizontalSlider from '../components/HorizontalSlider';
import { StatusBar } from 'expo-status-bar';
import GradientBackground from '../components/GradientBackground';

export default function HomeScreen() {
	const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
	const { top } = useSafeAreaInsets();
	const { width: windowWidth } = useWindowDimensions();

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator color='red' size={100} />
			</View>
		);
	}

	return (
		<>
			<StatusBar style='dark' />
			<GradientBackground>
				<ScrollView>
					<View style={{ marginTop: top + 10 }}>
						{/* Main Carousel */}
						<View style={{ height: 400 }}>
							<Text
								style={{
									fontSize: 30,
									fontWeight: 'bold',
									paddingHorizontal: 20,
								}}
							>
								En cines
							</Text>
							<Carousel
								data={nowPlaying}
								renderItem={({ item }) => <MoviePoster movie={item} />}
								sliderWidth={windowWidth}
								itemWidth={200}
							/>
						</View>

						{/* Popular Carousel */}
						<HorizontalSlider title='Populares' movies={popular} />

						{/* Top Rated Carousel */}
						<HorizontalSlider title='Mejor calificadas' movies={topRated} />

						{/* Upcoming Carousel */}
						<HorizontalSlider title='Próximamente' movies={upcoming} />
					</View>
				</ScrollView>
			</GradientBackground>
		</>
	);
}
