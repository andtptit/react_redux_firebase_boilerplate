import React from "react";
import { useSnapCarousel } from "react-snap-carousel";
import {Card, CardBody, CardImg, Button, Row, Col, CardSubtitle, Container, CardHeader} from 'reactstrap'

const styles = {
  root: {},
  scroll: {
    position: "relative",
    display: "flex",
    overflow: "auto",
    scrollSnapType: "x mandatory"
  },
  item: {
    paddingBottom: "2rem",
    flexShrink: 0
  },
  itemSnapPoint: {
    scrollSnapAlign: "start"
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  nextPrevButton: {
    padding: "0.5rem",
    border: "none",
    fontSize: "1.3rem"
  },
  nextPrevButtonDisabled: { 
    opacity: 0.3,
  },
  pagination: {
    display: "flex"
  },
  paginationButton: {
    margin: "5px",
    padding: "0.5rem",
    border: "none",
    fontSize: "1.3rem"
  },
  paginationButtonActive: { opacity: 0.3 },
  pageIndicator: {
    display: "flex",
    justifyContent: "center"
  }
};

const Carousel = ({ items, renderItem }) => {
  const {
    scrollRef,
    pages,
    activePageIndex,
    prev,
    next,
    goTo,
    snapPointIndexes
  } = useSnapCarousel({scrollPadding: "1px 0"});

  return (
    <div style={styles.root}>
      <ul style={styles.scroll} ref={scrollRef}>
        {items && items.map((item, i) =>
          renderItem({
            item,
            isSnapPoint: snapPointIndexes.has(i)
          })
        )}
      </ul>
      <div style={styles.controls} aria-hidden>
        <button
          style={{
            ...styles.nextPrevButton,
            ...(activePageIndex === 0 ? styles.nextPrevButtonDisabled : {})
          }}
          onClick={() => prev()}
        >
          {String.fromCharCode(8592)}
        </button>
        {pages.map((_, i) => (
          <button
            key={i}
            style={{
              ...styles.paginationButton,
              ...(activePageIndex === i ? styles.paginationButtonActive : {})
            }}
            onClick={() => goTo(i)}
          >
            {i + 1}
          </button>
        ))}
        <button
          style={{
            ...styles.nextPrevButton,
            ...(activePageIndex === pages.length - 1
              ? styles.nextPrevButtonDisabled
              : {})
          }}
          onClick={() => next()}
        >
          {String.fromCharCode(8594)}
        </button>
      </div>
      <div style={styles.pageIndicator}>
        {activePageIndex + 1} / {pages.length}
      </div>
    </div>
  );
};

const CarouselItem = ({ isSnapPoint, children }) => {
  return <>
      <li
    style={{
      ...styles.item,
      ...(isSnapPoint ? styles.itemSnapPoint : {})
    }}
  >
    {children}
  </li>
  </>
};

export { Carousel, CarouselItem };