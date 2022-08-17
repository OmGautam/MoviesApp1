import React,{Component} from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import {Header,AirbnbRating,Icon} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import axios from 'axios'

export default class HomeScreen extends Component{
    constructor(){
        super();
        this.state = {
            articleDetails: {}
        }
    }

    componentDidMount(){
        this.getArticles();
    }
    
    getArticles = () => {
        const url = "http://localhost:5000/getarticles"
        axios.get(url).then(response => {
            let details = response.data.data;
            details["title"] = details;
            this.setState({
                articleDetails: details
            })
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    likedMovies = () => {
        const url = "http://localhost:5000/likedarticles";
        axios.post(url).then(response => {
            this.getArticles();
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    unlikedMovies = () => {
        const url = "http://localhost:5000/unlikedarticles";
        axios.post(url).then(response => {
            this.getArticles();
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    render(){
        const {articleDetails} = this.state;
        if(movieDetails.posterlink){
            const {posterlink,title_x,release_date,duration,overview,rating} = movieDetails;
        
        return (
            <View style = {styles.container}>
                <View style = {styles.headerContainer}>
                    <Header 
                    centerComponent = {{text:"Articles",style:styles.headerTitle}}
                    rightComponent = {{icon:"movie-open",color:"red",type:"material-community", 
                    onPress:()=>this.props.navigation.navigate("Reccomended Articles")}}
                    backgroundColor = {"blue"}
                    containerStyle = {{flex:1}}
                    />
                </View>
                <View style = {styles.subContainer}>
                    <View style = {styles.supTopContainer}>
                        <Image style = {styles.posterImage}
                        source = {{uri:posterlink}}
                        />
                    </View>
                    <View style = {styles.subBottomContainer}>
                        <View style = {styles.upperBottomContainer}>
                            <Text style = {styles.title}>{title}</Text>
                            <Text style = {styles.subTitle}>{`${release_date.split("-")[0]} | ${duration}`}</Text>
                        </View>

                        <View style = {styles.lowerBottomContainer}>
                            <View style = {styles.iconBottomContainer}>
                                <TouchableOpacity onPress = {this.likedMovies}>
                                    <Icon 
                                    reverse 
                                    name = {"check"}
                                    type = {"entypo"}
                                    size = {RFValue(30)}
                                    color = {"green"}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress = {this.unlikedMovies}>
                                    <Icon 
                                    reverse 
                                    name = {"cross"}
                                    type = {"entypo"}
                                    size = {RFValue(30)}
                                    color = {"red"}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    return null
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    headerContainer:{
        flex:0.1
    },
    headerTitle:{
        color:"black",
        fontWeight:"bold",
        fontSize:RFValue(18)
    },
    subContainer:{
        flex:0.4,
        justifyContent:"center",
        alignItems:"center"
    },
    posterImage:{
        width:"60%",
        height:"90%",
        resizeMode:"stretch",
        borderRadius:RFValue(30),
        marginHorizontal:RFValue(10)
    },
    subBottomContainer:{
        flex:0.6
    },
    upperBottomContainer:{
        flex:0.2,
        alignItems:"center"
    },
    title:{
        fontSize:RFValue(20),
        fontWeight:"bold",
        textAlign:"center"
    },
    subTitle:{
        fontSize:RFValue(14),
        fontWeight:"300"
    },
    middleBottomContainer:{
        flex:0.35
    },
    overview:{
        fontSize:RFValue(13),
        textAlign:"center",
        fontWeight:"300",
        color:"grey"
    },
    lowerBottomContainer:{
        flex:0.45
    },
    iconBottomContainer:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center"
    },
    button:{
        width:RFValue(160),
        height:RFValue(50),
        borderRadius:RFValue(20),
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        marginTop:RFValue(15)
    },
    buttonText:{
        fontSize:RFValue(15),
        fontWeight:"bold"
    }
})
