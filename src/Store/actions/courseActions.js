import { storage } from "../../config/fbConfig";
import { uid } from 'uid';

export const addCourse = (course) => {
        return (dispatch, getState, {getFirestore, getFirebase}) => {
            const firestore = getFirestore();
            const date = new Date();
            const year = date.getFullYear()

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

export const removeDataCourse = (course) => {
    console.log('course', course)
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();
        firestore
            .collection('courses')
            .doc(`${course.id}`)
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


export const updateDataCourse = (currentData, datasearch) => {
    console.log('khoahoc', currentData)
    console.log('datasearch', datasearch)
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();

        firestore
            .collection(datasearch.CourseSelect)
            .doc(`${currentData.id}`)
            .update({
                wordTitle: currentData.wordTitle,
                meaning: currentData.meaning,
                example: [currentData.example],
                meaning_key: currentData.meaning_key,
                voice: currentData.voice,
                image: currentData.image,
            },
            {merge: true}
            )
            .then(() => {
                dispatch({
                    type: 'IMAGE_UPLOADED',
                    success: 'Image Uploaded SuccessFully',
                });
            })
            .catch((err)=> {
                dispatch({
                    type: 'IMAGE_UPLOAD_ERROR',
                    error: err,
                }) 
            })
    }
}

export const updateStudentLearnedCount = (course) => {
    console.log(course[0].id)

    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();

        firestore
            .collection('courses')
            .doc(`${course[0].id}`)
            .update({
                studentLearned: course[0].studentLearned + 1
            },
            {merge: true}
            )
            .then(() => {
            })
            .catch((err)=> {
                console.log(err)
            })
    }
}

export const removeCourse = (course) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();
        firestore
            .collection(course.courseId)
            .get()
            .then(querySnapshot => {
            querySnapshot.docs.map(doc => {
                firestore
                .collection(course.courseId)
                .doc(doc.id)
                .delete()
            });
        });
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

export const addNewCourse = (courseId, courseName, courseFile) => {
    console.log(courseFile);
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        JSON.parse(courseFile).map((result, index) => {
            firestore
                .add({collection: courseId},
                    {
                        courseName: courseName,
                        wordId: courseId + index,
                        wordTitle: result.wordTitle,
                        meaning: result.meaning,
                        example: result.example,
                        meaning_key: result.meaning_key,
                        voice: result.voice,
                        image: result.image,
                        learned: {}
                    }).catch((err)=> {
                    console.log(err)
                })
          })
    }
}

export const addNewCourseList = (courseId, courseName, courseLength) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        firestore
            .add({collection: 'courses'},
                {
                    courseId: courseId,
                    title: courseName,
                    courseLength: courseLength,
                    studentLearned: 0
                })
                .catch((err)=> {
                    console.log(err)
                });
    }
}

export const addLearned = (course, dataCourse, profile, datenow)  => {
    console.log('courseid', course, 'datacourse', dataCourse, 'profile', profile, 'day', datenow);
    console.log('dataCourse', dataCourse)
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();

        firestore
            .collection(course[0].courseId)
            .doc(dataCourse.id)
            .update({
                learned: 
                {
                    ...dataCourse.learned,
                    [profile]: {
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        time: datenow
                    }
                }
                
            },
            {merge: true}
            )
            .catch((err)=> {
                console.log(err)
                dispatch({
                    type: 'IMAGE_UPLOAD_ERROR',
                    error: err,
                }) 
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