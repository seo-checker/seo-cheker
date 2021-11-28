import "./Error.scss"

import React, { Component } from "react"
import { withTranslation } from 'react-i18next'

class Error extends Component {

    render() {
        const { t } = this.props.i18n;

        return (
            <div className="seo-checker-error">{ t('error', 'Error.') }</div>
        )
    }
}

export default withTranslation()(Error)