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
	Icon,
	TouchableOpacity,
	FooterTab,
	View
} from 'native-base';
import toolpic from '../images/toolpic.jpg';
import { StyleSheet, ImageBackground } from 'react-native';
export default class Tool extends Component {
	render() {
		return (
			<Container>
				<Header style={{ backgroundColor: '#69CF9C' }} />
				<Icon ios="ios-list-box" android="md-list-box" style={styles.Iconheader} />
				<ImageBackground source={toolpic} style={styles.backgroundContainer} />
				<FooterTab style={styles.foot} />
				<Text onPress={() => this.props.navigation.navigate('Home')} style={styles.buttontext}>
					𝐁𝐚𝐜𝐤
				</Text>
			</Container>
		);
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
		left: 185
	},
	backgroundContainer: {
		flex: 1,
		width: null,
		height: 450,
		justifyContent: 'center',
		alignItems: 'center'
	},
	foot: {
		backgroundColor: '#69CF7C',
		width: 500,
		height: 300,
		top: 201
	},
	buttontext: {
		fontSize: 25,
		color: 'white',
		textAlign: 'center',
		width: 250,
		backgroundColor: 'rgba(0,0,0,0.4)',
		borderRadius: 25,
		marginVertical: 20,
		paddingVertical: 16,
		top: 0,
		left: 83
	},
	button: {
		width: 250,
		backgroundColor: 'rgba(0,0,0,0.3)',
		borderRadius: 25,
		marginVertical: 20,
		paddingVertical: 16
	}
});
