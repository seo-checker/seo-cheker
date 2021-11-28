import "./index.scss"

import React from "react"
import ReactDOM from "react-dom"

import { I18nextProvider } from 'react-i18next'

import { Provider } from 'react-redux'
import store from './lib/store'

import i18n from "./lib/i18n"

import App from "./components/App/App"

// Blocks
import head from "./blocks/Head"
import html from "./blocks/Html"
import custom from "./blocks/Custom"
import schema from "./blocks/Schema"

const blocks = [ head, html, schema, custom ];

ReactDOM.render(
    <I18nextProvider i18n={ i18n }>
        <Provider store={store}>
            <App blocks={ blocks }/>
        </Provider>
    </I18nextProvider>,
    document.getElementById("seo-checker")
);