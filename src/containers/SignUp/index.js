import React from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	ToastAndroid,
	Dimensions,
	TouchableOpacity,
	ImageBackground
} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';
import images from '../images/baa.jpg';
const { width: WIDTH } = Dimensions.get('window');
export default class SignUp extends React.Component {
	state = {
		email: '',
		firstname: '',
		lastname: '',
		password: '',
		confirmpassword: '',
		errorMessage: null
	};
	signupNow = () => {
		if (
			this.state.email &&
			this.state.password &&
			this.state.firstname &&
			this.state.lastname &&
			this.state.confirmpassword
		) {
			if (this.state.password !== this.state.confirmpassword) {
				ToastAndroid.show('Confirm password is not matched with the password!', ToastAndroid.LONG);
				return false;
			}
			firebase
				.auth()
				.createUserWithEmailAndPassword(this.state.email, this.state.password)
				.then(() =>
					this.props.navigation.navigate('Home', {
						isFirst: true,
						credentials: {
							firstname: this.state.firstname,
							lastname: this.state.lastname
						}
					})
				)
				.catch((error) => this.setState({ errorMessage: error.message }));
		} else {
			ToastAndroid.show('Please fill all the fields!', ToastAndroid.LONG);
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground source={images} style={styles.backgroundContainer}>
					<Text style={styles.logoText}>Register</Text>
					<TextInput
						placeholder="Email"
						autoCapitalize="none"
						style={styles.textInput}
						onChangeText={(email) => this.setState({ email })}
						value={this.state.email}
						placeholderTextcolor={'rgba(255,255,255,0.7)'}
						underLineColorAndroid="transparent"
					/>
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.input}
							onChangeText={(firstname) => this.setState({ firstname })}
							value={this.state.username}
							placeholder={'Firstname'}
							autoCapitalize="none"
							placeholderTextcolor={'rgba(255,255,255,0.7)'}
							underLineColorAndroid="transparent"
						/>
						<TextInput
							style={styles.input}
							onChangeText={(lastname) => this.setState({ lastname })}
							value={this.state.username}
							placeholder={'Lastname'}
							autoCapitalize="none"
							placeholderTextcolor={'rgba(255,255,255,0.7)'}
							underLineColorAndroid="transparent"
						/>
					</View>
					<TextInput
						secureTextEntry
						placeholder="Password"
						autoCapitalize="none"
						placeholderTextcolor={'rgba(255,255,255,0.7)'}
						underLineColorAndroid="transparent"
						style={styles.textInput}
						onChangeText={(password) => {
							this.setState({ password });
						}}
						value={this.state.password}
					/>
					<TextInput
						style={styles.input}
						onChangeText={(confirmpassword) => this.setState({ confirmpassword })}
						value={this.state.username}
						placeholder={'Confirm Password'}
						autoCapitalize="none"
						placeholderTextcolor={'rgba(255,255,255,0.7)'}
						underLineColorAndroid="transparent"
					/>
					{this.state.errorMessage && <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>}
					<View style={{ marginVertical: 20 }}>
						<TouchableOpacity onPress={() => this.signupNow()} style={styles.button}>
							<Text style={styles.buttontext} color>
								Confirm
							</Text>
						</TouchableOpacity>
					</View>

					<View>
						<Text style={styles.SingupText}>
							Already have an account?{' '}
							<Text onPress={() => this.props.navigation.navigate('Login')} style={styles.SingupTextt}>
								Login
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
		color: 'black',
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 20
	},
	textInput: {
		width: WIDTH - 55,
		height: 45,
		borderRadius: 25,
		fontSize: 16,
		paddingLeft: 45,
		backgroundColor: 'white',
		color: 'black',
		marginHorizontal: 25,
		marginTop: 30
	},
	SingupTextt: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold'
	},
	SingupText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'normal'
	},
	backgroundContainer: {
		flex: 1,
		width: null,
		height: null,
		justifyContent: 'center',
		alignItems: 'center'
	},
	input: {
		width: WIDTH - 55,
		height: 45,
		borderRadius: 25,
		fontSize: 16,
		paddingLeft: 45,
		backgroundColor: 'white',
		color: 'black',
		marginHorizontal: 25,
		marginTop: 30
	},
	logoText: {
		color: 'white',
		fontSize: 30,
		fontWeight: '900',
		marginTop: 20,
		opacity: 0.5
	},
	buttontext: {
		fontSize: 16,
		color: 'white',
		textAlign: 'center'
	},
	button: {
		width: 250,
		backgroundColor: 'rgba(0,0,0,0.3)',
		borderRadius: 25,
		marginVertical: 20,
		paddingVertical: 16
	}
});
