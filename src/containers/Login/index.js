import React from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Button,
	ToastAndroid,
	Dimensions,
	TouchableOpacity,
	ImageBackground,
	Image
} from 'react-native';
import Icon from 'react-native-ionicons';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';
import ground from '../images/backkkk.jpg';
import logo from '../images/ant.png';
const { width: WIDTH } = Dimensions.get('window');
export default class Login extends React.Component {
	state = { email: '', password: '', errorMessage: null };
	handleLogin = () => {
		if (this.state.email && this.state.password) {
			firebase
				.auth()
				.signInWithEmailAndPassword(this.state.email, this.state.password)
				.then(() => this.props.navigation.navigate('Home'))
				.catch((error) => this.setState({ errorMessage: error.message }));
		} else {
			ToastAndroid.show('Please fill all the fields!', ToastAndroid.LONG);
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground source={ground} style={styles.backgroundContainer}>
					<View style={styles.logoContainer}>
						<Image source={logo} style={styles.logo} />
						<Text style={styles.logoText}>TEAW KAB MOD</Text>
					</View>
					<View style={styles.inputContainer}>
						<Icon ios="ios-person" android="md-person" style={styles.inputIcon} />
						<TextInput
							style={styles.input}
							placeholder={'Email'}
							onChangeText={(email) => this.setState({ email })}
							placeholderTextcolor={'rgba(255,255,255,0.7)'}
							underLineColorAndroid="transparent"
						/>
					</View>
					<View style={styles.inputContainer} />
					<TextInput
						style={styles.input}
						secureTextEntry={true}
						placeholderTextcolor={'rgba(255,255,255,0.7)'}
						underLineColorAndroid="transparent"
						autoCapitalize="none"
						placeholder="Password"
						onChangeText={(password) => this.setState({ password })}
						value={this.state.password}
					/>
					<Icon ios="ios-key" android="md-key" style={styles.inputIconn} />
					{this.state.errorMessage && <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>}
					<View style={{ marginVertical: 20 }}>
						<TouchableOpacity onPress={() => this.handleLogin()} style={styles.button}>
							<Text style={styles.buttontext} color>
								Login
							</Text>
						</TouchableOpacity>
					</View>
					<View>
						<Text>
							{' '}
							Don't have an account yet ?
							<Text
								onPress={() => this.props.navigation.navigate('SignUp')}
								// eslint-disable-next-line react-native/no-inline-styles
								style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}
							>
								{' '}
								Sign Up{' '}
							</Text>
						</Text>
					</View>
				</ImageBackground>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 20
	},
	textInput: {
		height: 40,
		fontSize: 20,
		width: '90%',
		borderColor: '#9b9b9b',
		borderBottomWidth: 1,
		marginTop: 8,
		marginVertical: 15
	},
	logoText: {
		color: 'black',
		fontSize: 30,
		fontWeight: '900',
		marginTop: 20,
		opacity: 0.5
	},
	inputContainer: {
		marginTop: 13
	},
	inputIcon: {
		position: 'absolute',
		top: 8,
		left: 37
	},
	inputIconn: {
		position: 'absolute',
		top: 418,
		left: 37
	},
	input: {
		width: WIDTH - 55,
		height: 45,
		borderRadius: 25,
		fontSize: 16,
		paddingLeft: 45,
		backgroundColor: 'rgba(0,0,0,0.35)',
		color: 'black',
		marginHorizontal: 25
	},
	buttontext: {
		fontSize: 16,
		color: '#ffffff',
		textAlign: 'center'
	},
	button: {
		width: 250,
		backgroundColor: 'rgba(0,0,0,0.35)',
		borderRadius: 25,
		marginVertical: 10,
		paddingVertical: 16
	},
	backgroundContainer: {
		flex: 1,
		width: null,
		height: null,
		justifyContent: 'center',
		alignItems: 'center'
	},
	logoContainer: {
		alignItems: 'center',
		marginBottom: 30
	},
	logo: {
		width: 400,
		height: 180
	}
});
