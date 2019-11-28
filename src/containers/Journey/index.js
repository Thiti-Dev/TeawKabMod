import React, { Component } from 'react';
import { Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-ionicons';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body } from 'native-base';
import { StyleSheet } from 'react-native';
import lock_img from '../Home/img/locked.png';
export default class Journey extends Component {
	constructor(props) {
		super(props);
		this.state = {
			locations: null,
			archived_location_lists: [],
			is_loaded: false
		};
		this.render_location = this.render_location.bind(this);
	}
	componentDidMount() {
		const { navigation } = this.props;
		let locations = navigation.getParam('locations', false);
		let archived_location_lists = navigation.getParam('archived_location_lists', false);
		this.setState({ locations, archived_location_lists, is_loaded: true }); // set the state
		console.log(
			'[Journey] : Recieved total location from props : ' +
				locations.length +
				' archived : ' +
				archived_location_lists.length
		);
	}
	render_star(star) {
		//console.log('[Star rendering ] : ' + star);

		let star_string = [];

		for (let x = 1; x <= star; x++) {
			star_string.push(<Icon key={x} ios="ios-star" android="md-star" size={24} />);
		}
		star_string.push(<Text key="test">{star} stars</Text>);

		return star_string;
	}
	render_location(unique_key_, img_address) {
		const { archived_location_lists } = this.state;
		let unique_key = unique_key_.toString();
		console.log(archived_location_lists);
		console.log('Key : ' + unique_key);
		if (archived_location_lists.includes(unique_key)) {
			console.log('User already archieved : ' + unique_key);
			// if the user already been in this area
			return (
				<React.Fragment>
					<Image
						source={{
							uri: img_address
						}}
						style={{ height: 250, width: 380, flex: 1 }}
					/>
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<Image
						source={{
							uri: img_address
						}}
						style={{ height: 250, width: 380, flex: 1, tintColor: 'gray' }}
					/>
					<Image
						source={{
							uri: img_address
						}}
						style={{ height: 250, width: 380, flex: 1, opacity: 0.2, position: 'absolute' }}
					/>
					<Image
						source={lock_img}
						style={{ height: 60, width: 60, flex: 1, position: 'absolute', top: 100, left: 160 }}
					/>
				</React.Fragment>
			);
		}
	}
	render() {
		const { is_loaded, locations } = this.state;
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
			let rendered_location = locations.map((data, key) => {
				return (
					<Card style={{ flex: 0 }} key={key}>
						<CardItem>
							<Left>
								<Thumbnail
									source={{
										uri: data.img_address
									}}
								/>
								<Body>
									<Text>{data.name_th}</Text>
									<Text note>{data.contact_number}</Text>
								</Body>
							</Left>
						</CardItem>
						<CardItem>
							<Body>
								{this.render_location(data.unique_id, data.img_address)}
								<Text style={{ marginTop: 10 }}>{data.address}</Text>
							</Body>
						</CardItem>
						<CardItem>
							<Button transparent textStyle={{ color: '#87838B' }}>
								{this.render_star(data.rate_star)}
								{/* <Icon ios="ios-star" android="md-star" size={24} />
								<Icon ios="ios-star" android="md-star" size={24} />
								<Icon ios="ios-star" android="md-star" size={24} />
								<Text>3 stars</Text> */}
							</Button>
						</CardItem>
					</Card>
				);
			});
			return (
				<Container>
					<Header style={{ backgroundColor: '#F1F960' }}>
						<Text style={styles.input}> 𝐉 𝐨 𝐮 𝐫 𝐧 𝐞 𝐲 </Text>
						<Icon style={styles.icon} ios="ios-car" android="md-car" size={24} />
					</Header>
					<Content>{rendered_location}</Content>
				</Container>
			);
		}
	}
}
const styles = StyleSheet.create({
	input: {
		fontSize: 25,
		color: 'black',
		fontWeight: 'bold',
		marginTop: 10
	},
	icon: {
		top: 8,
		marginTop: 10
	}
});
