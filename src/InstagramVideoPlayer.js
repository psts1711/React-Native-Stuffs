import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Video from 'react-native-video';

type State={
    paused:boolean,
    position:{start:number, end:number},
    muted: boolean;
}

class App extends React.Component<any,State> {
    threshold = 150;
    constructor(props) {
        super(props);
        this.state = {
            paused: true,
            position: {
                start: null, end: null,
                muted: true
            }
        }
    }
    componentDidMount(){}

    onVideoLayout=event=>{
        const {height} = Dimensions.get('window');
        this.state.position.start = -(
            event.nativeEvent.layout.y - height + this.threshold
        );
        this.state.position.end = event.nativeEvent.layout.y + event.nativeEvent.layout.height - this.threshold;
    }

    onScroll=event=>{
        const scrollPosition = event.nativeEvent.contentOffset.y;
        const paused = this.state.paused;
        const {start,end} = this.state.position;
        console.log(start,end,scrollPosition);
        if(scrollPosition<start && scrollPosition > end && paused){
            this.setState({paused: false})
        }else if(scrollPosition>start && !paused){
            this.setState({paused: true})
        }else if(scrollPosition>end && !paused){
            this.setState({paused: true})
        }

    }


    render(){
        return(
            <>
                <StatusBar barStyle="dark-content">
                    <SafeAreaView style={{flex:1}}>
                        <ScrollView scrollEventThrottle={16} onScroll={this.onScroll}>
                            <TouchableOpacity onPress={()=>this.setState({muted: !this.state.muted})}>
                                <Video
                                    muted={this.state.muted}
                                    onLayout={this.onVideoLayout}
                                    paused={this.state.paused}
                                    style={{
                                        backgroundColor:'black',
                                        width:'100%',
                                        height:300,
                                        marginTop:750,
                                        marginBottom:750
                                    }}
                                    resizeMode={'cover'}
                                    source={{
                                        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4'
                                    }}
                                >

                                </Video>
                            </TouchableOpacity>
                        </ScrollView>
                    </SafeAreaView>
                </StatusBar>
            </>
        )
    }

}



export default App;
