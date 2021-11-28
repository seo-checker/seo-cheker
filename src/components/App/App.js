import "./App.scss"

import React, { Component, Suspense } from "react"
import { connect } from 'react-redux'
import { setPage } from '../../lib/store'

import { MdSettings, MdClose } from "react-icons/md"

import Loader from "../Loader/Loader"
import Selector from "../Selector/Selector"
import Results from "../Results/Results"
import Settings from "../Settings/Settings"
import Menu from "../Menu/Menu"

class App extends Component {

    _ls = window.localStorage;
    _startH = null;
    _startY = null;

    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleDrag(e) {
        e.stopPropagation();
        const wrapper = this.wrapper.current;
        let delta = this._startY - (e.clientY || e.targetTouches[0].screenY);
        let h = this._startH + delta;
        wrapper.style.height = h + "px";
    }

    stopResize() {
        const wrapper = this.wrapper.current;
        this._ls.setItem('seo-checker-height', wrapper.clientHeight);
        document.documentElement.removeEventListener('mousemove', this.handleDrag, false);
        document.documentElement.removeEventListener('touchmove', this.handleDrag, false);
    }

    handleResize(e) {
        e.stopPropagation();
        const wrapper = this.wrapper.current;
        this._startY = e.clientY || e.targetTouches[0].screenY;
        this._startH = wrapper.clientHeight;
        document.documentElement.addEventListener('mousemove', this.handleDrag, false);
        document.documentElement.addEventListener('touchmove', this.handleDrag, false);
    }

    handleSettings() {
        this.props.setPage('settings');
    }

    handleClose() {
        this.wrapper.current.style.visibility = 'hidden';
    }

    componentDidMount() {
        const wrapper = this.wrapper.current;
        const height = this._ls.getItem('seo-checker-height') ?? 200;
        wrapper.style.height = height + "px";
    }

    render() {
        const { blocks, page } = this.props;
        return (
            <div className="seo-checker" >
                <div className="seo-checker-wrapper" ref={ this.wrapper }>
                    <div className="seo-checker-header"
                        onMouseDown={ this.handleResize.bind(this) }
                        onTouchStart={ this.handleResize.bind(this) }
                        onTouchEnd={ this.stopResize.bind(this) }
                        onMouseUp={ this.stopResize.bind(this) }
                    >
                        <div className="seo-checker-header-selector">
                            <Suspense fallback="Loading...">
                                <Selector blocks={
                                    blocks.map(el => {
                                        return {
                                            slug: el.slug,
                                            name: el.name
                                        }
                                    })
                                }/>
                            </Suspense>
                        </div>
                        <div className="seo-checker-header-title">
                            SEO cheker
                        </div>
                        <button onClick={ this.handleSettings.bind(this) }>
                            <span>
                                <MdSettings />
                            </span>
                        </button>
                        <button onClick={ this.handleClose.bind(this) }>
                            <span>
                                <MdClose />
                            </span>
                        </button>
                    </div>
                    <div className="seo-checker-container">
                        <Suspense fallback={<Loader />}>
                            <Menu blocks={
                                blocks.map(el => {
                                    return {
                                        slug: el.slug,
                                        name: el.name
                                    }
                                })
                            }/>
                            {
                                page === 'settings' ? <Settings /> : <Results blocks={ blocks } />
                            }
                        </Suspense>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        page: state.page.value
    };
}

export default connect(mapStateToProps, { setPage })(App)