import "./Selector.scss"

import React, { Component } from "react"
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { setPage } from '../../lib/store'

class Selector extends Component {

    render() {
        const { blocks, checker } = this.props;
        const { page } = checker;
        const { t } = this.props.i18n;
        return (
            <div className="seo-checker-selector">
                <select onChange={ (e) => { let el = e.target; this.props.setPage(el.value); } } value={ page }>
                    {
                        blocks.map((params) => {
                            const { slug, name } = params;
                            return (
                                <option value={ slug } key={ slug }>
                                    { t(slug, name) }
                                </option>
                            )
                        })
                    }
                    <option value="settings" key="settings">
                        { t('settings', 'Settings') }
                    </option>
                </select>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        checker: state.checker
    };
}

export default withTranslation()(connect(mapStateToProps, { setPage })(Selector))