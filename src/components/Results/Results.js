import "./Results.scss"

import React, { Component } from "react"
import { connect } from 'react-redux'

import Section from "./Section"
import Error from "../Error/Error"

class Results extends Component {

    getBlock() {
        const blocks = this.props.blocks;
        const current = this.props.page;
        for (let index = 0; index < blocks.length; index++) {
            if (current === blocks[index].slug)
                return blocks[index];
        }
        return blocks[0] || null;
    }

    render() {
        const block = this.getBlock();
        const { slug, sections } = block;

        return (
            <div className="seo-checker-results">
                {
                    (!sections) ? <Error /> : sections.map(section => {
                        const key = [slug, section.slug].join(".");
                        return (
                            <Section slug={ slug } section={ section } key={ key }/>
                        )
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        page: state.page.value
    };
}

export default connect(mapStateToProps)(Results)