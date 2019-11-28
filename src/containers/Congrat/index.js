import React, { Component } from 'react';
import { Image, StyleSheet, ActivityIndicator } from 'react-native';
import {
	Container,
	Header,
	Content,
	Card,
	CardItem,
	Thumbnail,
	Text,
	Button,
	Icon,
	Left,
	Body,
	Right
} from 'native-base';
import ballon from '../images/ballon.png';
export default class Congrat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: null,
			img_location: null,
			is_loaded: false
		};
		//this.render_location = this.render_location.bind(this);
	}
	componentDidMount() {
		const { navigation } = this.props;
		let title = navigation.getParam('title', false);
		let img_location = navigation.getParam('img_location', false);
		this.setState({ title, img_location, is_loaded: true }); // set the state
	}
	render() {
		const { is_loaded, title, img_location } = this.state;
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
			return (
				<Container>
					<Content>
						<Header style={{ backgroundColor: '#B80000' }} />
						<Icon ios="ios-trophy" android="md-trophy" style={styles.Iconheader} />
						<Card>
							<CardItem>
								<Left>
									<Thumbnail source={{ uri: 'Image URL' }} />
									<Body>
										<Text style={styles.Text}> 𝐂𝐨𝐧𝐠𝐫𝐚𝐭𝐮𝐥𝐚𝐭𝐢𝐨𝐧 </Text>
									</Body>
								</Left>
							</CardItem>
							<CardItem cardBody>
								<Image
									source={{
										uri: img_location
									}}
									style={{ height: 300, width: 100, flex: 1 }}
								/>
								<Image source={ballon} style={styles.logo} />
							</CardItem>
							<CardItem>
								<Left
									style={{
										flex: 1,
										justifyContent: 'center',
										alignItems: 'center'
									}}
								>
									<Text style={styles.Textt}> {title}</Text>
								</Left>
							</CardItem>
						</Card>
					</Content>
					<Text onPress={() => this.props.navigation.navigate('Home')} style={styles.buttontext}>
						𝐁𝐚𝐜𝐤
					</Text>
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
		left: 150,
		fontWeight: 'bold'
	},
	Iconheader: {
		position: 'absolute',
		top: 15,
		left: 185,
		color: 'black'
	},
	Text: {
		color: 'black',
		fontSize: 45,
		right: 30,
		top: -75
	},
	Iconheaderr: {
		position: 'absolute',
		top: 15,
		left: 100,
		color: 'black'
	},
	Textt: {
		fontWeight: 'bold',
		fontSize: 15,
		color: 'red'
	},
	Iconheaderrr: {
		position: 'absolute',
		top: 80,
		left: 100,
		color: 'black'
	},
	logo: {
		width: 280,
		height: 300,
		top: -100,
		right: 43,
		position: 'absolute'
	},
	buttontext: {
		fontSize: 25,
		color: 'white',
		textAlign: 'center',
		width: 250,
		backgroundColor: 'rgba(0,0,0,0.2)',
		borderRadius: 25,
		marginVertical: 20,
		paddingVertical: 16,
		top: 0,
		left: 83
	}
});
