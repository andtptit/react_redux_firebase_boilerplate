import React,{useState} from 'react'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
  } from 'reactstrap';


  const items = [
    {
      src:'https://firebasestorage.googleapis.com/v0/b/flash-card-kid.appspot.com/o/imageSlider%2Fkit_background_1.png?alt=media&token=2ba97bf0-f1ce-4de3-846a-67dfd67b30f3',
      caption: 'Kit 2021'
    },
    {
      src:'https://firebasestorage.googleapis.com/v0/b/flash-card-kid.appspot.com/o/imageSlider%2Fkit_background_2.png?alt=media&token=156cceab-ed30-4817-8279-43410ad5d845',
      caption: 'Kit 2021'
    },
  ];
  



const Slider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
  
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }
  
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.src}
          className="carousel"
        >
          <img className="slider-img" src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });
  
    return (
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    );  
}

export default Slider;