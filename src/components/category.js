import React,{Component} from 'react';
import {connect} from 'react-redux';

class Category extends Component{
    componentWillMount(){
        this.props.changeNav(true);
    }
    render(){
        return(
            <div>
                分类
            </div>
        )
    }
}

let mapStateToProps = (state)=>{
    // console.log('mapStateToProps:',state)
    return {
        // 把goodslist属性映射到App的props中
        navstate:state.home.navstate
    }
}
let mapDispatchToProps = (dispatch)=>{
    // console.log('mapDispatchToProps:',dispatch)
    return {
        changeNav(tid){
            dispatch({
                type:'CHANGE_NAV',
                payload:tid
            })
        }
    }
}
Category = connect(mapStateToProps,mapDispatchToProps)(Category);
export default Category