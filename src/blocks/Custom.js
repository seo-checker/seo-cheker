const ls = window.localStorage;
let config = [];
try {
    config = JSON.parse(ls.getItem('seo-checker-settings'));
} catch(e) {}
const sections = Array.isArray(config) ? config : null;

const Custom = {
    slug: "custom",
    name: "Custom",
    sections: sections
}

export default Custom