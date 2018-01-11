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
		this.PI_ACTUAL = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248'
		this.PI_ACTUAL_ARRAY = this.PI_ACTUAL.split('')
		this.MAX_LENGTH = this.PI_ACTUAL.length+1	//+1 to allow to temporarily type character and then see it backspaced
		this.state = {
			pi: this.PI_DEFAULT,
			correct: true, 
			timerRunning: false, 
			time: null,
			timeStart: null, 
			
			output: 'output',
			output2: 'output2',
			answer: 'correct', 
		}; 
	}

	handleKeyPress(text){
		if(text.length >= this.MAX_LENGTH){			//>= to prevent pasting
			this.setState({output: 'Too many digits, load more'})
			return
		}

		//Setting state after allows a character to temporarily appear, but then be backspaced and returning before any comparison is made
		this.setState({
			pi: text, 
		})

		if(!this.state.timerRunning){
			this.startTimer()
		}

		//Check if pi is correct
		let number = text.replace(/\s/g, '');
		let numDigits = number.length
		this.setState({
			output: number, 
			output2: this.PI_ACTUAL.substring(0, numDigits), 
		})

		this.correctDigit = new Array(numDigits)
		let numberArray = number.split('')
		this.setState({correct: true})		//Assume it's true to start
		for(i=0; i<numDigits; i++){
			if(numberArray[i] === this.PI_ACTUAL_ARRAY[i]){
				this.correctDigit[i] = true
			}
			else{
				this.correctDigit[i] = false
				this.setState({correct: false})
			}
		}

		// if(number === this.PI_ACTUAL.substring(0, numDigits)){
		// 	this.setState({
		// 		correct: true, 
		// 	})
		// }
		// else{
		// 	this.setState({
		// 		correct: false, 
		// 	})
		// }

		//make sure to trim spaces so stuff highlighted works? or unneeded if copied to new place
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
			}, 120)
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
					style={[styles.inputBox, styles.border, styles.incorrect, this.state.correct && styles.correct]}
				//Multiline doesn't work for numeric somehow
					multiline={true}
					maxLength={this.MAX_LENGTH}
					keyboardType = 'numeric'
					autoFocus={true}
					// onChangeText = {(text)=> this.onChanged(text)}
					onChangeText = {(text)=> this.handleKeyPress(text)}
					value={this.state.pi}
				/>

				<Text>{this.state.output}</Text>
				<Text>{this.state.output2}</Text>
				<Text>{this.state.answer}</Text>


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
		fontSize: 19, 
	}, 
	correct:{
		backgroundColor: '#0f0', 
	}, 
	incorrect:{
		backgroundColor: '#f00', 
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