import { storage } from "../../config/fbConfig";
import { uid } from 'uid';

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

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

export const updateImageCourse = (selectedImg, course) => {
    console.log('selectedImg', selectedImg)
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();

        firestore
            .collection("courses")
            .doc(`${course[0].id}`)
            .update({
                imgUrl: selectedImg
            },
            {merge: true}
            )
            .then(() => {
                dispatch({
                    type: 'IMAGE_UPLOADED',
                    success: 'Success',
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

export const updateImageDataCourse = (selectedImg, course, dataEdit) => {
    console.log('dataEdit', dataEdit)
    console.log('selectedImg', selectedImg)
    console.log('course', course)
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();

        firestore
            .collection(`${course[0].courseId}`)
            .doc(`${dataEdit.id}`)
            .update({
                image: selectedImg
            },
            {merge: true}
            )
            .then(() => {
                dispatch({
                    type: 'IMAGE_UPLOADED',
                    success: 'Success',
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

export const updateDataCourseFull = (course, newObjData) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();

        firestore
            .collection(`${course[0].courseId}`)
            .doc(`${newObjData.id}`)
            .update({
                wordTitle: newObjData.wordTitle,
                subTitle: newObjData.subTitle,
                example: newObjData.example,
                meaning: newObjData.meaning
            },
            {merge: true}
            )
            .then(() => {
                dispatch({
                    type: 'IMAGE_UPLOADED',
                    success: 'Success',
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


export const updateCourse = (course, title) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();

        firestore
            .collection("courses")
            .doc(`${course[0].id}`)
            .update({
                title: title
            },
            {merge: true}
            )
            .then(() => {
                dispatch({
                    type: 'IMAGE_UPLOADED',
                    success: 'Success',
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


export const removeDataCourse = (course) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();
        firestore
            .collection('courses')
            .doc(`${course[0].id}`)
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

export const removeDataFromCourse = (course, item) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();
        firestore
            .collection(`${course[0].courseId}`)
            .doc(`${item.id}`)
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
    console.log('removeCourse', course)
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();
        firestore
            .collection(course[0].courseId)
            .get()
            .then(querySnapshot => {
            querySnapshot.docs.map(doc => {
                firestore
                .collection(course[0].courseId)
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
                        wordId: makeid(10),
                        wordTitle: result.wordTitle,
                        subTitle: result.subTitle,
                        meaning: result.meaning,
                        example: result.example,
                        meaning_key: result.meaning_key,
                        voice: result.voice,
                        image: result.image,
                        learned: {}
                    }).catch((err)=> {
                    console.log(err)
                    dispatch({
                        type: 'IMAGE_UPLOAD_ERROR',
                        error: err,
                    })
                })
          })
    }
}

export const addNewCourseList = (courseId, courseName, courseLength, url) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        firestore
            .add({collection: 'courses'},
                {
                    courseId: courseId,
                    title: courseName,
                    courseLength: courseLength,
                    studentLearned: {},
                    learned: [],
                    imgUrl: url
                })
                .catch((err)=> {
                    console.log(err)
                });
    }
}

export const addDataToCourseList = (course, dataFlash, url) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        firestore
            .add({collection: `${course[0].courseId}`},
                {
                    wordId: makeid(10),
                    courseName: course[0].title,
                    wordTitle: dataFlash.wordTitle,
                    subTitle: dataFlash.subTitle,
                    meaning: dataFlash.meaning,
                    example: dataFlash.example,
                    meaning_key: "",
                    voice: "",
                    image: url,
                    learned: {}
                })
                .catch((err)=> {
                    console.log(err)
                });
    }
}

export const updateCourseLength = (course, action) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        if (action == "add") {
            firestore
                .collection('courses')
                .doc(`${course[0].id}`)
                .update({
                    courseLength: course[0].courseLength + 1
                },
                {merge: true}
                )
                .then(() => {
                })
                .catch((err)=> {
                    console.log(err)
                })
        }
        else
        {
            firestore
            .collection('courses')
            .doc(`${course[0].id}`)
            .update({
                courseLength: course[0].courseLength - 1
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
}

export const addLearned = (course, dataCourse, profile, datenow)  => {
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

export const addLearned_Title = (course, profile, datenow)  => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();

        if (!course[0].learned.includes(profile)) {
            firestore
                .collection("courses")
                .doc(course[0].id)
                .update(
                    {
                        studentLearned: 
                        {
                            ...course[0].studentLearned,
                            [profile]: {
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                time: datenow
                            }
                        },
                        learned: [...course[0].learned, profile]
                    },
                    {merge: true}
                )
                .catch((err)=> {
                    console.log(err)
                    dispatch({
                        type: 'IMAGE_UPLOAD_ERROR',
                        error: err,
                    }) 
                });
        }else{
            firestore
                .collection("courses")
                .doc(course[0].id)
                .update(
                    {
                        studentLearned: 
                        {
                            ...course[0].studentLearned,
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
                });
        }
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