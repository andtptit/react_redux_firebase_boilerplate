import React from 'react'

const FlashCardDetail = ({dataFlash, dataCourse, cntWordRemind, cntNewWord}) => { 
    console.log('FlashCardDetail re-render')
    return(
        <>
            <h4>{dataFlash && dataFlash.voice}</h4>
            <h2>Tổng số từ: {dataCourse && dataCourse.length}</h2>
            <h2>Tổng số từ bạn đã học: {cntWordRemind}</h2>
            <h2>Tổng số từ còn lại: {cntNewWord}</h2>
            <h2>Tổng số từ bạn đã học lớn hơn 30 ngày: {cntNewWord}</h2>
        </>
    )
}


export default FlashCardDetail;