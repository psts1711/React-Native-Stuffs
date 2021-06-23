import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Button,
  PermissionsAndroid
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            storagePermission: false,

        }
    }

    componentDidMount(): void {
        this.checkAndGrantStoragePermission();
    }

    checkAndGrantStoragePermission=()=>{
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((isPermited)=>{
            if(isPermited){
                this.setState({
                    storagePermission: true
                });
            }else{
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {message:'Please Give Permission to Save Images', title:'Storage Permission'}).then((data)=>{
                    this.setState({
                        storagePermission: true
                    });
                })
            }
        });
    }

    onSelect=()=>{
        ImageCropPicker.openPicker({includeBase64: true}).then((image)=>{
            const splitArray = image.path.split('/');
            const fileName = splitArray[splitArray.length-1]
            this.saveImage({source:image.data, fileName:fileName, mineType: image.mine});
        })
    }

    saveImage(data:{source:string, fileName:string, mine:string}){
        const folderPath = '/storage/emulated/0/rnLearn';
        const filePath = folderPath + '/' + data.fileName;

        RNFetchBlob.fs.isDir(folderPath).then((isDir)=>{
            if(isDir){
                this.addImage({source:data.source, path:filePath, mine:data.mine});
            }else{
                RNFetchBlob.fs.mkdir(folderPath).then(()=>{
                    this.addImage({source:data.source, path:filePath, mine:data.mine});
                })
            }
        })
    }

    addImage=(data:{source:string, path:string, mine:string})=>{
        RNFetchBlob.fs.createFile(data.path, data.source, 'base64').then(()=>{
           RNFetchBlob.fs.scanFile([{path: data.path,mine:data.mine}]).then(()=>{
               console.log('File has been saved');
           })
        })
    }

    render(){
        return(
            <SafeAreaView style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <View>
                    <Button title={'Select Image'} onPress={this.onSelect()} />
                </View>
            </SafeAreaView>
        )
    }

}

export default App;


