import React, { Component } from 'react';
import { Text, View } from 'react-native';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';

export default class TestPage extends Component {
	state = {
		isLoaded: false,
		currentMood: 'Happy'
	};

	async createDummyData() {
		console.log('trying to create dummy data');
		/*firebase.database().ref('users/001').set({
			name: 'Thiti Mahawannakit',
			age: 21,
			mood: 'SAD'
        });*/
		const fetched_data = await firebase.database().ref('users/001').once('value');
		console.log(fetched_data.val());
		this.setState({ isLoaded: true, currentMood: fetched_data.val().mood });
	}

	changeMood() {
		this.setState({ currentMood: 'Angry' });
	}

	componentDidMount() {
		//console.log('the component did just mount');
		this.createDummyData();
	}

	render() {
		const { currentMood, isLoaded } = this.state;
		let mood_data;
		if (isLoaded) {
			mood_data = <Text>Current mood : {currentMood}</Text>;
		} else {
			mood_data = <Text>Loading</Text>;
		}
		return (
			<View>
				{mood_data}
				{/* <Button title="Solid Button" onPress={this.changeMood.bind(this)} /> */}
			</View>
		);
	}
}
