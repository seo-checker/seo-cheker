import React, { Component } from "react"

import Test from "./Test"

class Tests extends Component {

    render() {
        const { slug, tests } = this.props;

        return (
            <>
                {
                    tests.map(test => {
                        const el = test.selector ? [...document.querySelectorAll(test.selector)] : this.props.el;
                        const key = [slug, test.slug].join(".");

                        return (
                            <Test
                                slug={ key }
                                el={ el }
                                test={ test }
                                key={ key }
                            />
                        )
                    })
                }
            </>
        );
    }
}
export default Tests