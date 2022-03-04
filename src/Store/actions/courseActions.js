import { storage } from "../../config/fbConfig";
import { uid } from 'uid';

export const addCourse = (course) => {
        return (dispatch, getState, {getFirestore, getFirebase}) => {
            const firestore = getFirestore();
            const date = new Date();
            const year = date.getFullYear()

            console.log('courseaction', course);

            firestore
                .add({collection: 'courses'},
                    {
                        courseId: `${year}${course.timeLearning}${uid()}`,
                        title: course.title,
                        courseUrl: course.courseUrl,
                        timeLearning: course.timeLearning,
                    })
                    .then((dispatch)=>{
                        dispatch({type:'CREATE_COURSE'});
                    }).catch((err)=>{
                        dispatch({type:'CREATE_COURSE_ERROR'});
                    });   
                
        }
}

export const removeCourse = (course) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();
        firestore
            .collection('courses')
            .doc(course.id)
            .delete()
            .then(() => {
                dispatch({
                    type: 'REMOVED_COURSE'
                })
            })
            .catch((err) => {
                dispatch({
                    type: 'REMOVE_TASK_ERR',
                    err
                })
            })
    }
}


export const addNewVideo = (course, title, url) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();

        firestore
            .collection('courses')
            .doc(course[0].id)
            .update({
                videos: firebase.firestore.FieldValue.arrayUnion({
                    name: title,
                    url: url
                })
            })
            .catch((err)=> {
                console.log(err)
                dispatch({
                    type: 'IMAGE_UPLOAD_ERROR',
                    error: err,
                }) 
            })
    }
}

// Custom
export const addNewCourseFile = (course, title, url) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();

        console.log(title)

        firestore
            .add({collection: 'courseFile'},
                {
                    title: title,
                    url: url
                }).catch((err)=> {
                console.log(err)
            })
    }
}



export const removeVideo = (course, title, url) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();

        firestore
            .collection('courses')
            .doc(course[0].id)
            .update({
                videos: firebase.firestore.FieldValue.arrayRemove({
                    name: title,
                    url: url
                })
            })
            .then(() => {
                var deleteTask = storage.ref().child(`courseVideos/${title}`)
                deleteTask.delete().then(() => {
                    console.log('Deleted File')
                }).catch((err) => {
                    console.log(err)
                })
            })
            .catch((err)=> {
                console.log(err)
                dispatch({
                    type: 'IMAGE_UPLOAD_ERROR',
                    error: err,
                }) 
            })
    }
}


export const addResource = (course, title, url)  => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();


        firestore
            .collection('courses')
            .doc(course[0].id)
            .update({
                references: firebase.firestore.FieldValue.arrayUnion({
                    name: title,
                    url: url
                })
            })
            .catch((err)=> {
                console.log(err)
                dispatch({
                    type: 'IMAGE_UPLOAD_ERROR',
                    error: err,
                }) 
            })
    }
}


export const removeResource = (course, title, url) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();

        firestore
            .collection('courses')
            .doc(course[0].id)
            .update({
                references: firebase.firestore.FieldValue.arrayRemove({
                    name: title,
                    url: url
                })
            })
            .then(() => {
                var deleteTask = storage.ref().child(`courseResources/${title}`)
                deleteTask.delete().then(() => {
                    console.log('Deleted File')
                }).catch((err) => {
                    console.log(err)
                })
            })
            .catch((err)=> {
                console.log(err)
                dispatch({
                    type: 'IMAGE_UPLOAD_ERROR',
                    error: err,
                }) 
            })
    }
}