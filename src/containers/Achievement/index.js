import React, { Component } from 'react';
import {
	Container,
	Header,
	Content,
	List,
	ListItem,
	Thumbnail,
	Text,
	Left,
	Body,
	Right,
	Button,
	Icon
} from 'native-base';
import { StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import antlogo from '../images/anttrophy.jpg';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';
export default class Achievement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			archievement_lists: [],
			is_loaded: false,
			archievement_data: null
		};
		//this.render_location = this.render_location.bind(this);
	}
	componentDidMount() {
		const { navigation } = this.props;
		let archievement_lists = navigation.getParam('archievement_lists', false);
		let archievement_data = navigation.getParam('archievement_data', false);
		this.setState({ archievement_lists, archievement_data, is_loaded: true }); // set the state
		console.log('[Journey] : Recieved total archievement_lists from props : ' + archievement_lists.length);
		console.log('[Journey] : Recieved total archievement_data from props : ' + archievement_data.length);
		//this.loadAllArchievementData();
	}

	// loadAllArchievementData() {
	// 	firebase.database().ref(`archievements`).once(
	// 		'value',
	// 		function(snap) {
	// 			let data = snap.val();
	// 			console.log('Total archievement_data loaded : ' + data.length);
	// 			if (data) {
	// 				this.setState({ archievement_data: data, is_loaded: true });
	// 			}
	// 		}.bind(this)
	// 	);
	// }
	render() {
		const { is_loaded, archievement_lists, archievement_data } = this.state;
		if (!is_loaded) {
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
			let render_archievement = archievement_lists.map((data, key) => {
				let data_ = archievement_data.find((x) => x.unique_id === parseInt(data));
				console.log(data_);
				return (
					<ListItem thumbnail key={key}>
						<Left>
							<Thumbnail
								square
								source={{
									uri:
										'http://www.myiconfinder.com/uploads/iconsets/256-256-41a967d24b6b709005d9523c2096ef01-award.png'
								}}
							/>
						</Left>
						<Body>
							<Text>{data_.name}</Text>
							<Text note numberOfLines={1}>
								{data_.info}
							</Text>
						</Body>
						<Right>{/* <Button transparent>
								<Text>View</Text>
							</Button> */}</Right>
					</ListItem>
				);
			});
			return (
				<Container>
					<Header style={{ backgroundColor: 'darkred' }} />
					<Icon ios="ios-trophy" android="md-trophy" style={styles.Iconheader} />
					<Text style={styles.logoText}> 𝐀𝐜𝐡𝐢𝐞𝐯𝐞𝐦𝐞𝐧𝐭</Text>
					<Content>
						<List>{render_archievement}</List>
					</Content>
					<ImageBackground source={antlogo} style={styles.backgroundContainer} />
				</Container>
			);
		}
	}
}
const styles = StyleSheet.create({
	logoText: {
		color: 'black',
		fontSize: 30,
		marginTop: 20,
		opacity: 0.5,
		top: 0,
		left: 120,
		fontWeight: 'bold'
	},
	backgroundContainer: {
		flex: 1,
		width: 430,
		height: null,
		justifyContent: 'center',
		alignItems: 'center'
	},
	Iconheader: {
		position: 'absolute',
		top: 15,
		left: 185,
		color: 'white'
	}
});
