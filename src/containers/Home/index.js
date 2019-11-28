// import React from 'react';
// import { StyleSheet, Platform, Image, Text, View } from 'react-native';
// import firebase from '@react-native-firebase/app';
// import '@react-native-firebase/database';
// import '@react-native-firebase/auth';

// import { Button } from 'native-base';
// export default class Home extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = { currentUser: null, is_load: false, _id: null, firstname: null, lastname: null };
// 		this.createAccounts = this.createAccounts.bind(this);
// 		this.loadAccounts = this.loadAccounts.bind(this);
// 	}

// 	componentDidMount() {
// 		const { currentUser } = firebase.auth();
// 		this.setState({ currentUser }, () => {
// 			const { navigation } = this.props;
// 			let is_first = navigation.getParam('isFirst', false);
// 			console.log('is_first : ' + is_first + ' currentUser : ' + this.state.currentUser);
// 			if (is_first) {
// 				let credentials = navigation.getParam('credentials', false);
// 				console.log('Found first time => creating the default credential');
// 				console.log(credentials);
// 				this.createAccounts(credentials);
// 			} else {
// 				this.loadAccounts();
// 			}
// 		});
// 	}

// 	createAccounts(credentials) {
// 		//var user = firebase.auth().currentUser;
// 		console.log(' currentUser  CHECK: ' + this.state.currentUser);
// 		if (this.state.currentUser) {
// 			let my_uid = this.state.currentUser.uid;
// 			firebase.database().ref(`users/${my_uid}`).set({
// 				firstname: credentials.firstname,
// 				lastname: credentials.lastname,
// 				_id: my_uid
// 			});
// 		} else {
// 			console.log("You're not loggedIn yet get back to login");
// 			this.props.navigation.navigate('Login');
// 		}
// 	}

// 	loadAccounts() {
// 		firebase.database().ref(`users/${this.state.currentUser.uid}`).once(
// 			'value',
// 			function(snap) {
// 				let data = snap.val();
// 				console.log(data.firstname);
// 				if (data) {
// 					//if found snap
// 					this.setState({
// 						firstname: data.firstname,
// 						lastname: data.lastname,
// 						_id: data._id,
// 						is_load: true
// 					});
// 				}
// 			}.bind(this)
// 		);
// 	}

// 	logoutUser() {
// 		console.log('Trying to logout');
// 		firebase.auth().signOut().then(() => this.props.navigation.navigate('Login'));
// 	}
// 	getUid() {
// 		let my_uid = this.state.currentUser.uid;
// 		console.log('My uid : ' + my_uid);
// 	}
// 	render() {
// 		const { currentUser } = this.state;
// 		return (
// 			<View style={styles.container}>
// 				<Text style={{ fontSize: 25 }}>
// 					Hi {this.state.firstname} {this.state.lastname}{' '}
// 				</Text>
// 				<Text style={{ color: 'blue', fontSize: 25 }}>{currentUser && currentUser.email}</Text>
// 				<Button full onPress={this.logoutUser.bind(this)} style={styles.signUp_BTN}>
// 					<Text>Logout</Text>
// 				</Button>
// 				<Button full onPress={this.getUid.bind(this)} style={{ marginTop: 20 }}>
// 					<Text>get my uid</Text>
// 				</Button>
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

import React, { Component } from 'react';
import {
	StyleSheet,
	Platform,
	Image,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ImageBackground,
	ActivityIndicator,
	Alert,
	PermissionsAndroid,
	ToastAndroid
} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';
import images from '../images/loca.png';
import lo from '../images/v.png';
import MapView, { Marker, AnimatedRegion, Animated } from 'react-native-maps';

import locked_blip from './img/locked.png';
import finish_blip from './img/finish.png';
import user_blip from './img/user.png';
import university_blip from './img/my_uni.png';
//var _mapView: MapView;

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: null,
			is_load: false,
			_id: null,
			firstname: null,
			lastname: null,
			user_la: null,
			user_lo: null,
			locations: null,
			archived_location_lists: [],
			archievement_lists: [],
			archievement_data: [],
			archievement_condition: [],
			is_map_loaded: false
		};
		//this.render_location = this.render_location.bind(this);
	}
	componentDidMount() {
		const { currentUser } = firebase.auth();
		this.setState({ currentUser }, () => {
			const { navigation } = this.props;
			let is_first = navigation.getParam('isFirst', false);
			console.log('is_first : ' + is_first + ' currentUser : ' + this.state.currentUser);
			if (is_first) {
				let credentials = navigation.getParam('credentials', false);
				console.log('Found first time => creating the default credential');
				console.log(credentials);
				this.createAccounts(credentials);
			} else {
				this.loadAccounts();
			}
		});
	}

	createAccounts(credentials) {
		//var user = firebase.auth().currentUser;
		console.log(' currentUser  CHECK: ' + this.state.currentUser);
		if (this.state.currentUser) {
			let my_uid = this.state.currentUser.uid;
			firebase.database().ref(`users/${my_uid}`).set(
				{
					firstname: credentials.firstname,
					lastname: credentials.lastname,
					_id: my_uid
				},
				function() {
					//after setting up the data on the database
					this.loadAccounts();
				}.bind(this)
			);
		} else {
			console.log("You're not loggedIn yet get back to login");
			this.props.navigation.replace('Login');
		}
	}

	loadAccounts() {
		firebase.database().ref(`users/${this.state.currentUser.uid}`).once(
			'value',
			function(snap) {
				let data = snap.val();
				//console.log(data.firstname);
				if (data) {
					//if found snap
					this.setState({
						firstname: data.firstname,
						lastname: data.lastname,
						_id: data._id
						//is_load: true
					});
					this.loadAllLocationsData();
					this.findCoordinates();
				} else {
					console.log('Invalid Crendentail get back to the login page');
					this.props.navigation.replace('Login');
				}
			}.bind(this)
		);

		//Listener event
		firebase.database().ref(`users/${this.state.currentUser.uid}/archived_location_lists`).on(
			'value',
			function(snapshot) {
				var changedPost = snapshot.val();
				console.log('The updated user archived location data are ' + changedPost);
				if (changedPost) {
					let finalize_array = changedPost.split(',');
					console.log('Total length of user location archived : ' + finalize_array.length);
					this.setState({ archived_location_lists: finalize_array });
				} else {
					// if empty initialize
					this.setState({ archived_location_lists: [] });
					console.log('Set empty array of archived because not found the data on the database');
				}
			}.bind(this)
		);

		firebase.database().ref(`users/${this.state.currentUser.uid}/archievement_lists`).on(
			'value',
			function(snapshot) {
				var changedPost = snapshot.val();
				console.log('The updated user archievement_lists data are ' + changedPost);
				if (changedPost) {
					let finalize_array = changedPost.split(',');
					console.log('Total length of user archievement_lists : ' + finalize_array.length);
					this.setState({ archievement_lists: finalize_array });
				} else {
					// if empty initialize
					this.setState({ archievement_lists: [] });
					console.log('Set empty array of archievement_lists because not found the data on the database');
				}
			}.bind(this)
		);
	}

	loadAllLocationsData() {
		firebase.database().ref(`locations`).once(
			'value',
			function(snap) {
				let data = snap.val();
				console.log('Total location loaded : ' + data.length);
				if (data) {
					this.setState({ locations: data }, function() {
						this.loadAllArchievementData();
					});
				}
			}.bind(this)
		);
	}

	loadAllArchievementData() {
		firebase.database().ref(`archievements`).once(
			'value',
			function(snap) {
				let data = snap.val();
				if (data) {
					console.log('Total archievement_data loaded : ' + data.length);
					this.setState({ archievement_data: data }, function() {
						this.loadAllArchievementConditions();
					});
				}
			}.bind(this)
		);
	}

	loadAllArchievementConditions() {
		firebase.database().ref(`archievements_condition`).once(
			'value',
			function(snap) {
				let data = snap.val();
				if (data) {
					console.log('Total archievement_condition loaded : ' + data.length);
					this.setState({ archievement_condition: data, is_load: true });
				}
			}.bind(this)
		);
	}

	async findCoordinates() {
		// navigator.geolocation.getCurrentPosition(
		// 	(position) => {
		// 		const location = JSON.stringify(position);
		// 		console.log(location);
		// 		//this.setState({ location });
		// 	},
		// 	(error) => Alert.alert(error.message),
		// 	{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		// );
		let use_loc = false;
		let granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
			title: 'App Geolocation Permission',
			message: "App needs access to your phone's location."
		});

		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			use_loc = true;
		} else {
			console.log('Location permission not granted!!!!');
		}

		if (use_loc) {
			Geolocation.getCurrentPosition(
				(position) => {
					console.log(position);
					console.log('Latitude : ' + position.coords.latitude + ' Longitude : ' + position.coords.longitude);
					this.setState(
						{ user_la: position.coords.latitude, user_lo: position.coords.longitude },
						function() {
							//after initialize the first location of the player assign the interval tick in the async function
							this.startLocationChecker(); // start async thread => every 3000ms
						}
					);
				},
				(error) => {
					// See error code charts below.
					console.log(error.code, error.message);
				},
				{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
			);
		}
	}

	logoutUser() {
		console.log('Trying to logout');
		firebase.auth().signOut().then(() => this.props.navigation.replace('Login'));
	}

	async startLocationChecker() {
		let use_loc = false;
		let granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
			title: 'App Geolocation Permission',
			message: "App needs access to your phone's location."
		});
		setInterval(() => {
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				use_loc = true;
			} else {
				console.log('Location permission not granted!!!!');
			}

			if (use_loc) {
				Geolocation.getCurrentPosition(
					(position) => {
						//console.log(position);
						if (
							this.state.user_la !== position.coords.latitude ||
							this.state.user_lo !== position.coords.longitude
						) {
							console.log(
								'[UPDATED] : Latitude : ' +
									position.coords.latitude +
									' Longitude : ' +
									position.coords.longitude
							);
							this.setState({ user_la: position.coords.latitude, user_lo: position.coords.longitude });
						}
						this.check_current_position(); // check if the user is in range of the location
						this.check_achievement_condition(); // check the archivement condition
					},
					(error) => {
						// See error code charts below.
						console.log(error.code, error.message);
					},
					{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
				);
			}
		}, 3000);
	}

	check_current_position() {
		const { locations, user_la, user_lo, archived_location_lists } = this.state;
		//console.log(archived_location_lists);
		locations.map((data, key) => {
			if (!archived_location_lists.includes(data.unique_id.toString())) {
				// if not archive yet
				let calc_1 = Math.abs(data.latitude - user_la);
				let calc_2 = Math.abs(data.longitude - user_lo);
				//console.log('calc_1: ' + calc_1);
				if (calc_1 <= 0.0002 && calc_2 <= 0.0002) {
					console.log('Archived location for user : location id : ' + data.unique_id);
					this.setState(
						(prevState) => ({
							archived_location_lists: [ ...prevState.archived_location_lists, data.unique_id.toString() ]
						}),
						function() {
							//after being initialize -local sided
							/*firebase.database().ref(`users/${this.state.currentUser.uid}`).set({
							name: 'SAD'
						})*/
							let finalize_array = this.state.archived_location_lists.join();
							firebase
								.database()
								.ref(`users/${this.state.currentUser.uid}`)
								.child('archived_location_lists')
								.set(
									finalize_array,
									function() {
										console.log('[Updated] : Archived Location has been updated to the database');
										setTimeout(() => {
											this.props.navigation.navigate('Congrat', {
												title: data.name_th,
												img_location: data.img_address
											});
										}, 2000);
									}.bind(this)
								);
						}
					);
				}
			}
		});
	}

	check_achievement_condition() {
		const { archievement_condition, archievement_lists, archived_location_lists } = this.state;
		//console.log(archievement_condition);

		// atleast one
		if (!archievement_lists.includes('0')) {
			//condition
			if (archived_location_lists.length > 0) {
				ToastAndroid.show('คุณได้รับรางวัล 1 เหรียญ (สามารถดูได้ที่ Archievement) ', ToastAndroid.TOP);
				console.log('[Condition Passed] : Giving archievement id 0 ');
				this.setState(
					(prevState) => ({
						archievement_lists: [ ...prevState.archievement_lists, '0' ]
					}),
					function() {
						//after being initialize -local sided
						/*firebase.database().ref(`users/${this.state.currentUser.uid}`).set({
						name: 'SAD'
					})*/
						let finalize_array = this.state.archievement_lists.join();
						firebase
							.database()
							.ref(`users/${this.state.currentUser.uid}`)
							.child('archievement_lists')
							.set(finalize_array, function() {
								console.log('[Updated] : Archivement has been updated to the database');
							});
					}
				);
			}
		} else if (!archievement_lists.includes('1')) {
			//condition
			if (archived_location_lists.length > 1) {
				ToastAndroid.show('คุณได้รับรางวัล 1 เหรียญ (สามารถดูได้ที่ Archievement) ', ToastAndroid.TOP);
				console.log('[Condition Passed] : Giving archievement id 1 ');
				this.setState(
					(prevState) => ({
						archievement_lists: [ ...prevState.archievement_lists, '1' ]
					}),
					function() {
						//after being initialize -local sided
						/*firebase.database().ref(`users/${this.state.currentUser.uid}`).set({
						name: 'SAD'
					})*/
						let finalize_array = this.state.archievement_lists.join();
						firebase
							.database()
							.ref(`users/${this.state.currentUser.uid}`)
							.child('archievement_lists')
							.set(finalize_array, function() {
								console.log('[Updated] : Archivement has been updated to the database');
							});
					}
				);
			}
		}

		archievement_condition.map((data, key) => {
			if (!archievement_lists.includes(data.target_archievement.toString())) {
				let finalize_array = data.condition.split(',');
				console.log(finalize_array);
				console.log('Target ar : ' + data.target_archievement);
				let success = true; // init value
				finalize_array.map((data__, key__) => {
					if (success) {
						// if still sucess
						if (!archived_location_lists.includes(data__)) {
							success = false;
						}
					}
				});
				if (success) {
					console.log('[Condition Passed] : Giving archievement id : ' + data.target_archievement);
					ToastAndroid.show('คุณได้รับรางวัล 1 เหรียญ (สามารถดูได้ที่ Archievement) ', ToastAndroid.TOP);
					this.setState(
						(prevState) => ({
							archievement_lists: [ ...prevState.archievement_lists, data.target_archievement ]
						}),
						function() {
							//after being initialize -local sided
							/*firebase.database().ref(`users/${this.state.currentUser.uid}`).set({
							name: 'SAD'
						})*/
							let finalize_array = this.state.archievement_lists.join();
							firebase
								.database()
								.ref(`users/${this.state.currentUser.uid}`)
								.child('archievement_lists')
								.set(finalize_array, function() {
									console.log('[Updated] : Archivement has been updated to the database');
								});
						}
					);
				}
			}
		});
	}
	setMapLoaded() {
		console.log('[MAP] Set map loaded]');
		this.setState({ is_map_loaded: true });
	}

	render() {
		const {
			currentUser,
			is_load,
			user_la,
			user_lo,
			locations,
			firstname,
			lastname,
			archived_location_lists,
			is_map_loaded
		} = this.state;
		let final_user_la = user_la ? user_la : 13.652944;
		let final_user_lo = user_lo ? user_lo : 100.49525;
		if (!is_load) {
			return (
				<ActivityIndicator
					color="blue"
					size="large"
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				/>
			);
		} else {
			// if the data is already loaded => which means the locations are all fetched
			//console.log('Render');
			let render_static_marker;
			let rendered_location_marker;
			if (is_map_loaded) {
				rendered_location_marker = locations.map((data, key) => {
					console.log('Render marker');
					return (
						<Marker
							tracksViewChanges={true}
							key={key}
							coordinate={{
								latitude: data.latitude,
								longitude: data.longitude
							}}
							title={data.name_th}
						>
							<Image
								//onLoad={() => this.forceUpdate()}
								source={
									archived_location_lists.includes(data.unique_id.toString()) ? (
										finish_blip
									) : (
										locked_blip
									)
								}
								style={{ width: 25, height: 25 }}
							/>
						</Marker>
					);
				});

				render_static_marker = (
					<React.Fragment>
						<Marker
							tracksViewChanges={true}
							coordinate={{
								latitude: 13.650983,
								longitude: 100.495327
							}}
							title="มหาวิทยาลัยของเรา"
						>
							<Image
								source={university_blip}
								//onLoad={() => this.forceUpdate()}
								style={{ width: 50, height: 50 }}
							/>
						</Marker>

						<Marker
							tracksViewChanges={true}
							coordinate={{
								latitude: final_user_la,
								longitude: final_user_lo
							}}
							title="ตำแหน่งของคุณ"
						>
							<Image
								source={user_blip}
								//onLoad={() => this.forceUpdate()}
								style={{ width: 20, height: 20 }}
							/>
						</Marker>
					</React.Fragment>
				);
			}
			return (
				<Container>
					<Header style={{ backgroundColor: '#F2F2FF' }}>
						<Button style={styles.buttontool} onPress={() => this.props.navigation.navigate('Tool')}>
							<Icon ios="ios-book" android="md-book" style={{ left: 0, position: 'absolute' }} />
							<View>
								<Text
									style={{
										fontSize: 16,
										color: 'white',
										left: 12
									}}
								>
									𝐓𝐨𝐨𝐥
								</Text>
							</View>
						</Button>
						<Button style={styles.buttontool2} onPress={this.logoutUser.bind(this)}>
							<Icon ios="ios-key" android="md-key" style={{ left: -9, position: 'absolute' }} />
							<View>
								<Text
									style={{
										fontSize: 10,
										color: 'white',
										left: 12
									}}
								>
									LogOut
								</Text>
							</View>
						</Button>
						<Icon ios="ios-contact" android="md-contact" style={styles.Iconheader} />
						{/* <Text style={styles.Textuser}>{currentUser && currentUser.email}</Text> */}
						<Text style={styles.Textuser}>
							{firstname && lastname ? `${firstname} ${lastname}` : 'Anonymous'}
						</Text>
					</Header>
					<Content>
						<View style={{ height: 505 }}>
							<MapView
								style={{ flex: 1 }}
								provider={null}
								ref={(map) => {
									this.map = map;
								}}
								track
								initialRegion={{
									latitude: 13.652944,
									longitude: 100.49525,
									latitudeDelta: 0.0922,
									longitudeDelta: 0.0421
								}}
								onMapReady={this.setMapLoaded.bind(this)}
							>
								{/* Starting point at the university */}
								{/* <Marker
									tracksViewChanges={false}
									coordinate={{
										latitude: 13.650983,
										longitude: 100.495327
									}}
									title="มหาวิทยาลัยของเรา"
								>
									<Image
										source={university_blip}
										//onLoad={() => this.forceUpdate()}
										style={{ width: 50, height: 50 }}
									/>
								</Marker>

								<Marker
									tracksViewChanges={false}
									coordinate={{
										latitude: final_user_la,
										longitude: final_user_lo
									}}
									title="ตำแหน่งของคุณ"
								>
									<Image
										source={user_blip}
										//onLoad={() => this.forceUpdate()}
										style={{ width: 34, height: 34 }}
									/>
								</Marker> */}

								{/* Dynamic fetched location */}
								{rendered_location_marker}
								{render_static_marker}
							</MapView>
						</View>
						<Button
							full
							dark
							onPress={() =>
								this.map.animateToRegion(
									{
										longitude: final_user_lo,
										latitude: final_user_la,
										longitudeDelta: 0.0421,
										latitudeDelta: 0.0922
									},
									1000
								)}
						>
							<Text style={{ color: 'white' }}>ตำแหน่งของฉัน</Text>
						</Button>
					</Content>
					<Footer>
						<FooterTab>
							<Button
								vertical
								onPress={() =>
									this.props.navigation.navigate('Achievement', {
										archievement_lists: this.state.archievement_lists,
										archievement_data: this.state.archievement_data
									})}
							>
								<Icon ios="ios-trophy" android="md-trophy" style={styles.inputIconn} />
								<View>
									<Text style={styles.SingupText}>
										<Text style={styles.input}>𝐀𝐜𝐡𝐢𝐞𝐯𝐞𝐦𝐞𝐧𝐭</Text>
									</Text>
								</View>
							</Button>
							<Button vertical active>
								<Icon active name="navigate" />
								<Text style={styles.input}>𝐌𝐚𝐩</Text>
							</Button>
							<Button
								vertical
								onPress={() =>
									this.props.navigation.navigate('Journey', {
										locations: this.state.locations,
										archived_location_lists: this.state.archived_location_lists
									})}
							>
								<Icon ios="ios-car" android="md-car" style={styles.inputIconn} />
								<Text style={styles.input}>𝐉𝐨𝐮𝐫𝐧𝐞𝐲</Text>
							</Button>
						</FooterTab>
						<Footer style={{ backgroundColor: '#F2F2FF' }} />
					</Footer>
				</Container>
			);
		}
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttontext: {
		fontSize: 16,
		color: '#ffffff',
		textAlign: 'center'
	},
	button: {
		width: 250,
		backgroundColor: 'rgba(0,0,0,0.4)',
		borderRadius: 25,
		marginVertical: 10,
		paddingVertical: 16
	},
	backgroundContainer: {
		flex: 1,
		width: 900,
		height: 900,
		justifyContent: 'center',
		alignItems: 'center'
	},
	backgroundContainerfoot: {
		flex: 1,
		width: 900,
		height: 900,
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo: {
		width: 400,
		height: 180
	},
	input: {
		fontSize: 16,
		color: 'white'
	},
	Iconheader: {
		position: 'absolute',
		top: 15,
		left: 15
	},
	Textuser: {
		position: 'absolute',
		top: 19,
		left: 50,
		color: 'black',
		fontWeight: 'bold'
	},
	buttontool: {
		position: 'absolute',
		top: 1,
		left: 240,
		backgroundColor: 'steelblue',
		width: 87,
		height: 35,
		borderRadius: 25,
		marginVertical: 10,
		paddingVertical: 16
	},
	buttontool2: {
		position: 'absolute',
		top: 1,
		left: 330,
		backgroundColor: 'red',
		width: 76,
		height: 35,
		borderRadius: 25,
		marginVertical: 10,
		paddingVertical: 16
	},
	mapContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	}
});
