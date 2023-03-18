import React from 'react'
import { useParams } from 'react-router'
import { Container, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import CourseContainer from '../../../Components/Containers/CourseContainer';
// import CustomBreadcurmb from '../../../Components/Breadcrumb';


const Course = () => {
    const {course} = useParams();
    const str_href = window.location.pathname
    const url_bred = str_href.split("/")
    return(
        <Container>
            <h2 className="table-title mt-3 mb-3 p-3">Chỉnh sửa Khóa học</h2>
            {/* <CustomBreadcurmb url_bred={url_bred}/> */}
            <CourseContainer courseId={course}></CourseContainer>
        </Container>
    )
}


export default Course;