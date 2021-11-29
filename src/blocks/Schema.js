const getJSON = (json) => {
    try {
        return JSON.parse(json);
    } catch (e) {
        return false;
    }
}

const schemaRegex = /^http(s)?:\/\/schema.org\/$/;

const Schema = {
    slug: "schema",
    name: "Shema.org",
    sections: [
        {
            slug: 'jsonld',
            name: "JSON-LD",
            tests: [
                {
                    slug: 'exists',
                    name: "JSON-LD exists",
                    selector: 'script[type="application/ld+json"]',
                    iswarning: true,
                    func: (el, expect) => {
                        expect(el).not.to.be.empty;
                    },
                    tests: [
                        {
                            slug: 'valid',
                            name: "All JSON-LD has valid JSON format",
                            func: (el, expect) => {
                                el.map(item => {
                                    const content = item.innerText;
                                    const obj = getJSON(content);
                                    expect(obj).to.be.an.instanceof(Object);
                                    expect(obj).to.have.property('@context').and.match(schemaRegex);
                                    expect(obj).to.have.property('@type').and.not.to.be.empty;
                                });
                            }
                        },
                        {
                            slug: 'breadcrumbs',
                            name: "Breadcrumbs JSON-LD exist and there is only one breadcrumbs block",
                            iswarning: true,
                            func: (el, expect) => {
                                const results = el.map(item => {
                                    try {
                                        const content = item.innerText;
                                        const obj = getJSON(content);
                                        expect(obj).to.be.an.instanceof(Object);
                                        expect(obj).to.have.property('@context').and.match(schemaRegex);
                                        expect(obj).to.have.property('@type').to.be.equal('BreadcrumbList');
                                        return true;
                                    } catch(e) {
                                        return false;
                                    }
                                }).filter(Boolean);
                                expect(results).not.to.be.empty;
                                expect(results).to.have.lengthOf(1);
                            },
                            tests: [
                                {
                                    slug: 'valid',
                                    name: "Breadcrumbs is valid",
                                    func: (el, expect) => {
                                        const breadcrumbs = el.map(item => {
                                            try {
                                                const content = item.innerText;
                                                const obj = getJSON(content);
                                                expect(obj).to.be.an.instanceof(Object);
                                                expect(obj).to.have.property('@context').and.match(schemaRegex);
                                                expect(obj).to.have.property('@type').to.equal('BreadcrumbList');
                                                return obj;
                                            } catch(e) {
                                                return false;
                                            }
                                        });
                                        const obj = breadcrumbs[0];
                                        expect(obj).to.have.property('itemListElement').and.to.be.an.instanceof(Array);
                                        const list = obj['itemListElement'];
                                        expect(list).not.to.be.empty;
                                        let pos = 1;
                                        list.map(item => {
                                            expect(item).to.be.an.instanceof(Object);
                                            expect(item).to.have.property('@type').to.equal('ListItem');
                                            expect(item).to.have.property('position').to.be.equal(pos);
                                            expect(item).to.have.property('name').and.not.to.be.empty;
                                            expect(item).to.have.property('item').and.not.to.be.empty;
                                            pos++;
                                        });
                                    },
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            slug: 'microdata',
            name: "Microdata",
            tests: [
                {
                    slug: 'exists',
                    name: "Microdata exists",
                    selector: '[itemscope][itemtype]',
                    iswarning: true,
                    func: (el, expect) => {
                        expect(el).not.to.be.empty;
                    },
                    tests: [
                        {
                            slug: 'breadcrumbs',
                            name: "Breadcrumbs microdata exist and there is only one breadcrumbs microdata on page",
                            selector: '[itemtype*="BreadcrumbList"]',
                            iswarning: true,
                            func: (el, expect) => {
                                expect(el).not.to.be.empty;
                                const results = el.map(item => {
                                    expect(item.getAttribute('itemtype')).to.match(/^http(s)?:\/\/schema.org\/BreadcrumbList$/);
                                    return true;
                                }).filter(Boolean);
                                expect(results).not.to.be.empty;
                                expect(results).to.have.lengthOf(1);
                            },
                            tests: [
                                {
                                    slug: 'valid',
                                    name: "Breadcrumbs microdata is valid",
                                    func: (el, expect) => {
                                        const obj = el[0];
                                        const items = obj.querySelectorAll('[itemprop="itemListElement"][itemscope]');
                                        expect(items).to.be.an.instanceof(NodeList).and.not.to.be.empty;
                                        let pos = 1;
                                        for (let pos = 1; pos <= items.length; pos++) {
                                            const item = items[pos - 1];
                                            const itemItem = (!!item.querySelector('a[itemprop="item"]') || (items.length === pos)); // Last item may not have an item element
                                            const itemName = item.querySelector('[itemprop="name"]')?.innerText ?? null;
                                            const itemPosition = parseInt(item.querySelector('[itemprop="position"]')?.getAttribute('content') ?? 0);
                                            console.log(itemItem);
                                            expect(itemItem).to.be.true;
                                            expect(itemName).not.to.be.empty;
                                            expect(itemPosition).to.be.equal(pos);
                                        };
                                    },
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

export default Schema