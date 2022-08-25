import React from 'react'
import { Breadcrumb, BreadcrumbItem} from 'reactstrap';


const CustomBreadcurmb = ({url_bred}) => {

    console.log(url_bred);

    return(
        <React.Fragment>
            <Breadcrumb className="bread__custom">
                <BreadcrumbItem ><a href={"/"}>Trang chủ</a></BreadcrumbItem>
                {
                url_bred.map((url_parser, index) => {
                    if (index > 0) {
                    return <BreadcrumbItem key={index}><a href={url_parser}>{url_parser}</a></BreadcrumbItem>
                    }
                })
                }
            </Breadcrumb>
        </React.Fragment>
    )
}


export default CustomBreadcurmb;