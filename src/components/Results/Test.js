import "./Test.scss"

import React, { Component } from "react"
import { withTranslation } from 'react-i18next'

import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io"

import chai from "../../lib/chai"

import Tests from "./Tests"

const { expect } = chai;

class Test extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
    }

    run(el = null) {
        const { test } = this.props;
        let { func } = test;

        let result = {
            status: false
        }

        if (!func)
            return result;

        try {
            if (typeof func !== 'function') {
                func = window.Function('el', 'expect', '"use strict";' + func);
            }
            func(el, expect);
            result.status = true;
        } catch (e) {
            result.message = e?.message || false;
        }

        return result;
    };

    render() {
        const { expanded } = this.state;
        const { slug, test } = this.props;
        const { selector, name, tests, results } = test;
        const { t } = this.props.i18n;

        const el = selector ? [...document.querySelectorAll(selector)] : this.props.el;

        const { status, message } = this.run(el);

        const className = [status ? "success" : (test.iswarning ? "warning" : "fail"), expanded && results ? "expanded" : ""].join(' ');

        return (
            <div className={ "seo-checker-test " + className }>
                <div>
                    { t(slug, name) }
                    {
                        results ?
                        <a onClick={ () => { console.log(expanded); this.setState({ expanded: !expanded }); } }>
                            {
                                expanded ? <IoIosRemoveCircleOutline /> : <IoIosAddCircleOutline />
                            }
                        </a>
                        : ''
                    }
                </div>
                {
                    results ?
                    <pre>
                        <code>
                            {
                                el.map(item => item.outerHTML).join("\n")
                            }
                        </code>
                    </pre>
                    : ''
                }
                <p>{ message }</p>
                {
                    // Recursive tests call
                    (status && tests !== void(0) && Array.isArray(tests)) ? <Tests slug={ slug } tests={ tests } el={ el }/> : ''
                }
            </div>
        )
    }
}
export default withTranslation()(Test)