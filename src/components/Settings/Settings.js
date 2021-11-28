import "./Settings.scss"

import React, { Component } from "react"
import { withTranslation } from 'react-i18next'
import CodeMirror from '@uiw/react-codemirror'
import { json } from '@codemirror/lang-json'

class Settings extends Component {
    
    _ls = window.localStorage;

    render() {
        const { i18n } = this.props;
        const { t } = i18n;
        const code = this._ls.getItem('seo-checker-settings') ?? '';

        return (
            <div className="seo-checker-settings">
                <div className="seo-checker-title">{ t('settings', 'Settings') }</div>
                <CodeMirror
                    value={ code }
                    height="100%"
                    extensions={ [json()] }
                    onChange={(value, viewUpdate) => {
                        this._ls.setItem('seo-checker-settings', value)
                    }}
                />
            </div>
        )
    }
}

export default withTranslation()(Settings)