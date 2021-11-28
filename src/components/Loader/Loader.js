import "./Loader.scss"

import React, { Component } from "react"

class Loader extends Component {

    render() {
        return(
            <div className="seo-checker-loader">
                <div className="seo-checker-loader-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }
}

export default Loader