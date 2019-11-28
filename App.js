/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import TestPage from './src/containers/TestPage/TestPage';
import SplashPage from './src/containers/SplashPage';
import SignUp from './src/containers/SignUp';
import Login from './src/containers/Login';
import Home from './src/containers/Home';
import Journey from './src/containers/Journey';
import Achievement from './src/containers/Achievement';
import Tool from './src/containers/Tool';
import Congrat from './src/containers/Congrat';

const App = createStackNavigator(
	{
		SplashPage: {
			screen: SplashPage,
			navigationOptions: {
				header: null
			}
		},
		SignUp: {
			screen: SignUp,
			navigationOptions: {
				header: null
			}
		},
		Login: {
			screen: Login,
			navigationOptions: {
				header: null
			}
		},
		TestPage: {
			screen: TestPage,
			navigationOptions: {
				header: null
			}
		},
		Home: {
			screen: Home,
			navigationOptions: {
				header: null
			}
		},
		Journey: {
			screen: Journey,
			navigationOptions: {
				header: null
			}
		},
		Achievement: {
			screen: Achievement,
			navigationOptions: {
				header: null
			}
		},
		Tool: {
			screen: Tool,
			navigationOptions: {
				header: null
			}
		},
		Congrat: {
			screen: Congrat,
			navigationOptions: {
				header: null
			}
		}
	},
	{
		initialRouteName: 'SplashPage'
	}
);

export default createAppContainer(App);
