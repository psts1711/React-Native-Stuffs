import React, {Component} from 'react';
import {
  SafeAreaView,
  Animated,
  Text,
  PanResponder
} from 'react-native';


class App extends Component {
    textPosition = {x:0, y:0};
    constructor(props) {
        super(props);
        this.position.addListener(latestPosition=>{
            this.textPosition = latestPosition
        })
    }

    position = new Animated.ValueXY();
    panResponder = PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderMove:(e,gestureState)=>{
            console.log(gestureState);
            const newPosition = {x:gestureState.dx, y:gestureState.dy};
            this.position.setValue(newPosition);
        },
        onPanResponderGrant:()=>{
            this.position.setOffset({x: this.textPosition.x, y: this.textPosition.y});
            this.position.setValue({x:0, y:0});
        },
        onPanResponderEnd:()=>{
            this.position.flattenOffset();
        }
    });



    render(){
        return(

                    <SafeAreaView style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Animated.View     style={{
                            transform: [{ translateX: this.position.x }, { translateY: this.position.y }]
                        }}            {...this.panResponder.panHandlers}>
                            <Text>
                                sss
                            </Text>
                        </Animated.View>
                    </SafeAreaView>


        )
    }

}

export default App;


