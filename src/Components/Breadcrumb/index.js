import React from 'react'
import { Breadcrumb, BreadcrumbItem} from 'reactstrap';


const CustomBreadcurmb = ({url_bred}) => {

    return(
        <React.Fragment>
            <Breadcrumb className="bread__custom">
                <BreadcrumbItem ><a href={"/"}>Trang chủ</a></BreadcrumbItem>
                {
                url_bred.map((url_parser, index) => {
                    console.log('rl_parser', url_bred[index]);
                    if (index === 1) {
                        return <BreadcrumbItem key={index}><a href={"/" + url_bred[index]}>{url_parser}</a></BreadcrumbItem>
                    }else if (index === 2) {
                        return <BreadcrumbItem key={index}><a href={"/" + url_bred[index-1] + "/" + url_bred[index]}>{url_parser}</a></BreadcrumbItem>
                    }else if (index === 3) {
                        return <BreadcrumbItem key={index}><a href={"/" + url_bred[index-2] + "/" + url_bred[index-1] + "/" + url_bred[index]}>{url_parser}</a></BreadcrumbItem>
                    }
                })
                }
            </Breadcrumb>
        </React.Fragment>
    )
}


export default CustomBreadcurmb;