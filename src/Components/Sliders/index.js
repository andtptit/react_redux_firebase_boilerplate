import React from 'react';
import { Carousel, CarouselItem } from "../Carousel";
import {Card, CardBody, CardImg, Button, Row, Col, CardSubtitle, Container, CardHeader} from 'reactstrap'

const Sliders = ({courseData, isSnapPoint, profile}) => {
    const admin = profile.userType === "Admin" ? true : false

  return (
    <>
    {!admin && 
        (Array.isArray(courseData) && courseData.length > 0?
            <Carousel
            items={courseData}
            renderItem={({ item, isSnapPoint }) => (
                <CarouselItem key={item.id} isSnapPoint={isSnapPoint}> 
                    <div
                    style={{
                        width: 300,
                        textAlign: "center",
                        boxSizing: "border-box",
                    }}
                    >
                    <Card className="course-card course-card__custom" body outline color="info">
                        {/* <CardImg height={"100px"} top src={c.imgUrl} alt="Card image cap" /> */}
                        <CardHeader className="course-title card-header__custom"><strong>{item.title}</strong></CardHeader>
                        <CardBody className='card-body__custom'>
                            <CardSubtitle className="mb-2 subtitle">Số lượng từ vựng: {item.courseLength}</CardSubtitle>
                            <Button  className="mt-2 card-button__custom continue">
                                <a href={`/courses/${item.courseId}`} className="link">
                                    Bắt đầu
                                </a>
                            </Button>
                        </CardBody>
                    </Card>
                    </div>
                </CarouselItem>
            )}
        /> : <div className="course-title">Không có khóa học nào</div>)
    }

    {admin && 
        (Array.isArray(courseData) && courseData.length > 0?
            <Carousel
            items={courseData}
            renderItem={({ item, isSnapPoint }) => (
                <CarouselItem key={item.id} isSnapPoint={isSnapPoint}> 
                    <div
                    style={{
                        width: 300,
                        textAlign: "center",
                        boxSizing: "border-box",
                    }}
                    >
                    <Card className="course-card course-card__custom" body outline color="info">
                        {/* <CardImg height={"100px"} top src={c.imgUrl} alt="Card image cap" /> */}
                        <CardHeader className="course-title card-header__custom"><strong>{item.title}</strong></CardHeader>
                        <CardBody className='card-body__custom'>
                            <CardSubtitle className="mb-2 subtitle">Số lượng từ vựng: {item.courseLength}</CardSubtitle>
                            <Button  className="mt-2 card-button__custom continue">
                                <a href={`/courses/${item.courseId}`} className="link">
                                    Xem khóa học
                                </a>
                            </Button>

                        </CardBody>
                    </Card>
                    </div>
                </CarouselItem>
            )}
        /> : <div className="course-title">Không có khóa học nào</div>)
    }
    </>

        
  );
};


export default Sliders;