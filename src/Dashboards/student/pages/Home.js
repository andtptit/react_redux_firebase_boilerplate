import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Card, Row, Container, Col, CardTitle, CardText, Button } from 'reactstrap';
import { compose } from 'redux';
import Notification from '../../../Components/Notification';
import useTitle from '../../../Hooks/useTitle';
import useScrollTop from '../../../Hooks/useScrollTop';
import ipaIcon from '../../../Assets/icons/ipa.png';
import favoriteIcon from '../../../Assets/icons/favorite.png';
import grammarIcon from '../../../Assets/icons/grammar.png';
import Grid from '@material-ui/core/Grid';
import FeatureBox from '../../../Components/FeatureBox';
import { makeStyles } from '@material-ui/core/styles';
import CustomAlert from '../../../Components/Alert';


const FEATURE_LIST = [
    {
      title: 'Học từ vựng',
      subTitle:
        'Học từ vựng cùng Tiếng Hàn Thầy Tư',
      imgUrl: ipaIcon,
      to: '/courses',
    },
    {
        title: 'Ngữ Pháp',
        subTitle: 'Luyện ngữ pháp cùng Tiếng Hàn Thầy Tư',
        imgUrl: grammarIcon,
        to: '/',
    },
    {
        title: 'Từ vựng yêu thích của bạn',
        subTitle: 'Danh sách những từ vựng yêu thích mà bạn đã lưu',
        imgUrl: favoriteIcon,
        to: '/',
    }
];

const useStyles = makeStyles({
    element: {
      paddingTop: '30px',
    },
  });

const Home = ({profile, listcourse, authSuccess}) => {

    useTitle('Ứng dụng học tiếng Hàn miễn phí')
    useScrollTop()
    const classes = useStyles()
    const profileX = profile.SRN
    let objCourseNew = []
    let objCourseLearned = []
    if(listcourse) {
        console.log("render")
        for ( var index=0; index<listcourse.length; index++ ) {
            if (listcourse[index] && Object.keys(listcourse[index].studentLearned).includes(profileX)) {
                objCourseLearned.push(listcourse[index])
            } else {
                objCourseNew.push(listcourse[index])
            }
        }
    }
    return(
        <div className={`${classes.element} container my-10`}>
            {authSuccess && <CustomAlert alert={authSuccess}></CustomAlert>}
            <Grid container spacing={3}>
            {FEATURE_LIST.map((box, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                <FeatureBox
                    imgUrl={box.imgUrl}
                    title={box.title}
                    to={box.to}
                    subTitle={box.subTitle}
                />
                </Grid>
            ))}
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        profile: state.firebase.profile, 
        listcourse: state.firestore.ordered.listcourse,
        authSuccess: state.auth.authSuccess,
    }
}

export default compose(connect(mapStateToProps), firestoreConnect((props) =>
{
    console.log('props', props)
    return [
        {
            collection: 'courses',
            storeAs: 'listcourse'
        },
    ]
} ))(Home);