import "./Section.scss"

import React, { Component } from "react"
import { withTranslation } from 'react-i18next'

import Tests from "./Tests"
import Error from "../Error/Error"

class Section extends Component {

    render() {
        const { slug, section, i18n } = this.props;
        const { t } = i18n;
        const { tests, selector, name } = section;

        const key = [slug, section.slug].join(".");        
        
        const el = selector ? [...document.querySelectorAll(selector)] : null;

        return (
            <div className="seo-checker-section">
                <div className="seo-checker-title">{ t(key, name) }</div>
                {
                    (tests !== void(0) && Array.isArray(tests)) ? <Tests slug={ key } tests={ tests } el={ el }/> : <p>{ t("notfound", "Not found") }</p>
                }
            </div>
        )
    }
}

export default withTranslation()(Section)