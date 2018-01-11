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
	TouchableHighlight, 
} from 'react-native';

import TimeFormatter from 'minutes-seconds-milliseconds' 

import picIcon from './assets/icon.png';


export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.PI_DEFAULT = '3.14';
		this.state = {
			pi: this.PI_DEFAULT,
			output: 'output',
			timerRunning: false, 
			time: null,
			timeStart: null, 
			
			// counter: 0, 
		}; 
	}

	startTimerIfStopped(){
		//check if NOT backspace key

		if(!this.state.timerRunning){
			this.startTimer()
		}
	}

	startTimer(){
		let {time} = this.state
		if(!this.state.timerRunning){
			this.setState({
				timeStart: new Date(),
				timerRunning: true, 
			})
			this.intervalId = setInterval(() =>{
				this.setState({time: new Date() - this.state.timeStart + time, })
			}, 100)
		}
	}

	pause(){
		clearInterval(this.intervalId)
		this.setState({timerRunning: false, })
	}

	reset(){
		this.pause()
		this.setState({
			timerRunning: false, 
			time: null, 
		})
	}

	clear(){
		this.setState({pi: this.PI_DEFAULT})
	}

	restart(){
		this.pause()
		this.setState({
			pi: this.PI_DEFAULT, 
			timerRunning: false, 
			time: null, 
		})
	}

	render() {
		return (
			<View style={[styles.container]}>
				<View style={styles.statusBar} />
			
				<View style={[styles.timerContainer]}>
					<Text style={[styles.timer, styles.defaultText, styles.highlight, styles.border]}>{TimeFormatter(this.state.time)}</Text>
				</View>
				<View style={[styles.controlsContainer]}>
					<Text style={[styles.border ]} onPress={() => this.startTimer()}>Resume</Text>
					<Text style={[styles.border ]} onPress={() => this.pause()}>Pause</Text>
					<View style={[styles.resetContainer]}>
						<TouchableHighlight underlayColor='yellow' style={[styles.button ]} onPress={() => this.reset()}>
							<Text style={[styles.buttonText]}>Reset Timer</Text>
						</TouchableHighlight>
						<TouchableHighlight underlayColor='yellow' style={[styles.button ]} onPress={() => this.clear()}>
							<Text style={[styles.buttonText]}>Clear</Text>
						</TouchableHighlight>
						<TouchableHighlight underlayColor='yellow' style={[styles.button ]} onPress={() => this.restart()}>
							<Text style={[styles.buttonText]}>Restart</Text>
						</TouchableHighlight>
					</View>
				</View>

				<TextInput
					style={[styles.inputBox, styles.border]}
					multiline={true}
					keyboardType = 'numeric'
					autoFocus={true}
					// onChangeText = {(text)=> this.onChanged(text)}
					onChangeText = {(text)=> {
						this.setState({
							pi: text, 
							// output: text, 
						})
						this.startTimerIfStopped()
					}}
					value={this.state.pi}
				/>

				<Text>{this.state.output}</Text>
				<Text>Running? {this.state.timerRunning ? 'true' : 'false'}</Text>


				<Image source={picIcon} style={[styles.roundPic]}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	border:{
		borderWidth: StyleSheet.hairlineWidth, 
	}, 

	// statusBar:{
	//   height: StatusBar.currentHeight,
	//   backgroundColor: "black",
	// }, 

	container: {
		flex: 1,
		flexDirection: 'column', 
		backgroundColor: 'orange',
	},
	timerContainer:{
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

	timer: {
		fontSize: 24, 
		fontWeight: 'bold', 
	}, 

	inputBox:{
		height: 40,
		backgroundColor: 'white', 
	}, 

	button:{
		margin: 1, 
		padding: 3, 
		alignItems: 'center', 
		borderWidth: 2, 
		borderRadius: 5, 
		backgroundColor: 'lightgray', 
	}, 
	buttonText:{
		fontSize: 15, 
		fontWeight: 'bold', 
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


AppRegistry.registerComponent('learn-pi', () => App)