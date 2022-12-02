import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
	children: JSX.Element | JSX.Element[];
}

export default function GradientBackground({ children }: Props) {
	return (
		<View style={{ flex: 1 }}>
			<LinearGradient
				colors={['#084f6a', '#75cedb', 'white']}
				style={{ ...StyleSheet.absoluteFillObject }}
				start={{ x: 0.1, y: 0.1 }}
				end={{ x: 0.5, y: 0.5 }}
			/>
			{children}
		</View>
	);
}
