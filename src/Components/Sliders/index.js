import React from 'react';
import { Carousel, CarouselItem } from "../Carousel";
import { Card, CardContent, Button, Typography } from '@material-ui/core';
import useStyle from './style';
import { Link } from 'react-router-dom';

const Sliders = ({courseData, isSnapPoint, profile}) => {
    const admin = profile.userType === "Admin" ? true : false
    const classes = useStyle();

  return (
    <>
    {!admin && 
        (Array.isArray(courseData) && courseData.length > 0?
            <Carousel
            items={courseData}
            renderItem={({ item, isSnapPoint }) => (
                <CarouselItem key={item.id} isSnapPoint={isSnapPoint}> 
                    <div
                        className={`${classes.carouselItem}`}
                    >
                    <Card onClick={() => window.location.href = `/courses/${item.courseId}`} className={classes.card}>
                        <CardContent>
                            <Typography className={classes.cardTitle} gutterBottom>
                            {item.title}
                            </Typography>
                            <Typography className={classes.cardContent} variant="body2" component="p">
                            Số lượng từ vựng: {item.courseLength}
                            </Typography>
                        </CardContent>
                    </Card>
                    </div>
                </CarouselItem>
            )}
        /> : <div className={classes.title}>Không có khóa học nào</div>)
    }

    {admin && 
        (Array.isArray(courseData) && courseData.length > 0?
            <Carousel
            items={courseData}
            renderItem={({ item, isSnapPoint }) => (
                <CarouselItem key={item.id} isSnapPoint={isSnapPoint}> 
                    <div className={`${classes.carouselItem}`} >
                    <Card onClick={() => window.location.href = `/courses/${item.courseId}`} className={classes.card}>
                        <CardContent>
                            <Typography className={classes.cardTitle} gutterBottom>
                            {item.title}
                            </Typography>
                            <Typography className={classes.cardContent} variant="body2" component="p">
                            Số lượng từ vựng: {item.courseLength}
                            </Typography>
                        </CardContent>
                    </Card>
                    </div>
                </CarouselItem>
            )}
        /> : <div className={classes.title}>Không có khóa học nào</div>)
    }
    </>

        
  );
};


export default Sliders;