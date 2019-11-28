// import React from 'react';
// import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
// import firebase from '@react-native-firebase/app';
// import '@react-native-firebase/database';
// import '@react-native-firebase/auth';
// export default class SplashPage extends React.Component {
// 	componentDidMount() {
// 		// setTimeout(() => {
// 		// 	firebase.auth().onAuthStateChanged((user) => {
// 		// 		this.props.navigation.navigate(user ? 'Home' : 'SignUp');
// 		// 		console.log('Navigation : Rendered');
// 		// 	});
// 		// 	//this.props.navigation.navigate('SignUp');
// 		// }, 1800);
// 		var user = firebase.auth().currentUser;
// 		this.props.navigation.navigate(user ? 'Home' : 'SignUp');
// 		console.log('Rendered in splash page navigate');
// 	}

// 	render() {
// 		return (
// 			<View style={styles.container}>
// 				<Text style={{ color: 'blue', fontSize: 40 }}>Learn Firebase</Text>
// 				<ActivityIndicator color="blue" size="large" />
// 			</View>
// 		);
// 	}
// }
// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center'
// 	}
// });

import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';
import logoo from '../images/ant.png';

export default class SplashPage extends React.Component {
	componentDidMount() {
		setTimeout(() => {
			//   firebase.auth().onAuthStateChanged(user => {
			//     this.props.navigation.navigate(user ? 'Home' : 'SignUp');
			//   });
			var user = firebase.auth().currentUser;
			this.props.navigation.replace(user ? 'Home' : 'SignUp');
			console.log('Rendered in splash page navigate');
		}, 1800);
	}
	componentWillUnmount() {
		console.log('UNMOUNT');
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.logoContainer}>
					<Image source={logoo} style={styles.logo} />
					<Text style={styles.logoText}>𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨</Text>
				</View>
				<Text style={{ color: 'black', fontSize: 40 }}>𝐓𝐞𝐚𝐰 𝐤𝐚𝐛 𝐌𝐨𝐝</Text>
				<ActivityIndicator color="blue" size="large" />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
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
