import "./Menu.scss"

import React, { Component } from "react"

import MenuItem from "./MenuItem"

class Menu extends Component {

    render() {
        const blocks = this.props.blocks;
        return (
            <div className="seo-checker-menu">
                <ul>
                    {
                        blocks.map((params) => {
                            return (
                                <MenuItem params={ params } key={ params.slug } />
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Menu