import React, { Component } from "react"
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { setPage } from '../../lib/store'

class Menuitem extends Component {

    render() {
        const { slug, name } = this.props.params;
        const { t } = this.props.i18n;
        const current = this.props.page;
        
        return (
            <li className={ slug === current ? 'active' : null }>
                <a href="#" onClick={ () => { this.props.setPage(slug); } }>
                    { t(slug, name) }
                </a>
            </li>
        )
    }
}

function mapStateToProps(state) {
    return {
        page: state.page.value
    };
}

export default withTranslation()(connect(mapStateToProps, { setPage })(Menuitem))