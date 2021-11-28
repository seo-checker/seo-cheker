import chai from "chai";
import chaiDom from "chai-dom";

import i18n from "./i18n"

chai.use(chaiDom);
chai.config.showDiff = false;

const { flag, getActual, objDisplay } = chai.util;

chai.util.getMessage = (obj, args) => {
    const { t } = i18n;
    var negate = flag(obj, 'negate')
        , val = flag(obj, 'object')
        , expected = args[3]
        , actual = getActual(obj, args)
        , msg = negate ? args[2] : args[1]
        , flagMsg = flag(obj, 'message');

    if (typeof msg === "function") msg = msg();
    msg = msg || '';

    // Translate
    if (msg) {
        if (val !== void(0) && Array.isArray(val))
            val.forEach((el, index) => {
                msg = msg.replace("'"+el+"'", "'#{val-"+index+"}'");
            });

        msg = msg.split(" ")?.map(word => { return t("chai." + word, word) }).join(' ');

        if (val !== void(0) && Array.isArray(val))
            val.forEach((el, index) => {
                msg = msg.replace("#{val-"+index+"}", el);
            });
    }

    msg = msg
        .replace(/#\{this\}/g, function () { return objDisplay(val); })
        .replace(/#\{act\}/g, function () { return objDisplay(actual); })
        .replace(/#\{exp\}/g, function () { return objDisplay(expected); });

    return flagMsg ? flagMsg + ': ' + msg : msg;
};

export default chai