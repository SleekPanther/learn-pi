import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	AppRegistry,
	StatusBar,
	Image, 
	Dimensions, 
	TextInput, 
} from 'react-native';

import picIcon from './assets/icon.png';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { pi: '3.14', output: 'output' };
	}

	render() {
		return (
			<View style={[styles.container]}>
				<View style={styles.statusBar} />
			
				<View style={[styles.clockContainer]}>
					<Text style={[styles.clock, styles.defaultText, styles.highlight, styles.border]}>0:31</Text>
				</View>
				<View style={[styles.controlsContainer]}>
					<Text style={[styles.border ]}>Play</Text>
					<Text style={[styles.border ]}>Pause</Text>
					<View style={[styles.resetContainer]}>
						<Text style={[styles.border ]}>Reset Clock</Text>
						<Text style={[styles.border ]}>Clear</Text>
						<Text style={[styles.border ]}>Restart</Text>
					</View>
				</View>

				<TextInput
					style={[styles.inputBox, styles.border]}
					multiline={true}
					keyboardType = 'numeric'
					autoFocus={true}
					// onChangeText = {(text)=> this.onChanged(text)}
					onChangeText = {(text)=> this.setState({pi: text})}
					value={this.state.pi}
				/>

				<Text>{this.state.pi}</Text>


				<Image source={picIcon} style={[styles.roundPic]}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	border:{
		borderWidth: StyleSheet.hairlineWidth, 
	}, 

	statusBar:{
		height: StatusBar.currentHeight,
		backgroundColor: "black",
	}, 

	container: {
		flex: 1,
		flexDirection: 'column', 
		backgroundColor: 'orange',
	},
	clockContainer:{
		flexDirection: 'row', 
		justifyContent: 'center', 
	}, 
	controlsContainer:{
		justifyContent: 'space-around',
		flexDirection: 'row', 
	}, 
	resetContainer:{
		// flexDirection: 'column'
	}, 

	clock: {
		fontSize: 24, 
		fontWeight: 'bold', 
	}, 

	inputBox:{
		height: 40,
		backgroundColor: 'white', 
	}, 


	roundPic:{
		borderRadius: 100, 
		flex: 1, 
		width: Dimensions.get('window').width, 
	}, 


	defaultText:{
		fontSize: 20, 
		padding: 2, 
	}, 
	highlight:{
		backgroundColor: 'yellow', 
	}, 
});


// AppRegistry.registerComponent('learn-pi', () => Extra)