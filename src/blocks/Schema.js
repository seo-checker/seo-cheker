const getJSON = (json) => {
    try {
        return JSON.parse(json);
    } catch (e) {
        return false;
    }
}

const schemaRegex = /^https?:\/\/schema.org\/?$/;

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
                                    expect(obj, '@context').to.have.property('@context').and.match(schemaRegex);
                                    expect(obj, '@type').to.have.property('@type').and.not.to.be.empty;
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
                                        expect(obj, '@context').to.have.property('@context').and.match(schemaRegex);
                                        expect(obj, '@type').to.have.property('@type').to.equal('BreadcrumbList');
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
                                    name: "Breadcrumbs JSON-LD is valid",
                                    func: (el, expect) => {
                                        const breadcrumbs = el.map(item => {
                                            try {
                                                const content = item.innerText;
                                                const obj = getJSON(content);
                                                expect(obj).to.be.an.instanceof(Object);
                                                expect(obj, '@context').to.have.property('@context').and.match(schemaRegex);
                                                expect(obj, '@type').to.have.property('@type').to.equal('BreadcrumbList');
                                                return obj;
                                            } catch(e) {
                                                return false;
                                            }
                                        });
                                        const obj = breadcrumbs[0];
                                        expect(obj, 'itemListElement').to.have.property('itemListElement').and.to.be.an.instanceof(Array);
                                        const list = obj['itemListElement'];
                                        expect(list).not.to.be.empty;
                                        let pos = 1;
                                        list.map(item => {
                                            expect(item).to.be.an.instanceof(Object);
                                            expect(item, '@type').to.have.property('@type').to.equal('ListItem');
                                            expect(item, 'position').to.have.property('position').to.be.equal(pos);
                                            expect(item, 'name').to.have.property('name').and.not.to.be.empty;
                                            expect(item, 'item').to.have.property('item').and.not.to.be.empty;
                                            pos++;
                                        });
                                    },
                                }
                            ]
                        },
                        {
                            slug: 'articles',
                            name: "Articles JSON-LD exists on page",
                            iswarning: true,
                            func: (el, expect) => {
                                const results = el.map(item => {
                                    try {
                                        const content = item.innerText;
                                        const obj = getJSON(content);
                                        expect(obj).to.be.an.instanceof(Object);
                                        expect(obj, '@context').to.have.property('@context').and.match(schemaRegex);
                                        expect(obj, '@type').to.have.property('@type').to.equal('NewsArticle');
                                        return true;
                                    } catch(e) {
                                        return false;
                                    }
                                }).filter(Boolean);
                                expect(results).not.to.be.empty;
                            },
                            tests: [
                                {
                                    slug: 'valid',
                                    name: "Articles JSON-LD is valid",
                                    func: (el, expect) => {
                                        const articles = el.map(item => {
                                            try {
                                                const content = item.innerText;
                                                const obj = getJSON(content);
                                                expect(obj).to.be.an.instanceof(Object);
                                                expect(obj, '@context').to.have.property('@context').and.match(schemaRegex);
                                                expect(obj, '@type').to.have.property('@type').to.equal('NewsArticle');
                                                return obj;
                                            } catch(e) {
                                                return false;
                                            }
                                        }).filter(Boolean);
                                        articles.map(article => {
                                            expect(article, 'dateModified').to.have.property('dateModified').and.not.to.be.empty;
                                            expect(article, 'datePublished').to.have.property('datePublished').and.not.to.be.empty;
                                            expect(article, 'headline').to.have.property('headline').and.not.to.be.empty;
                                            expect(article, 'image').to.have.property('image').and.to.be.an.instanceof(Array);
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
                                            const itemName = item.querySelector('[itemprop="name"]')?.innerText ?? '';
                                            const itemPosition = parseInt(item.querySelector('[itemprop="position"]')?.getAttribute('content') ?? 0);
                                            expect(itemItem, "item").to.be.true;
                                            expect(itemName, "name").not.to.equal('');
                                            expect(itemPosition, "position").to.be.equal(pos);
                                        };
                                    },
                                }
                            ]
                        },
                        {
                            slug: 'articles',
                            name: "Article microdata exists on page",
                            selector: '[itemtype*="Article"]',
                            iswarning: true,
                            func: (el, expect) => {
                                expect(el).not.to.be.empty;
                                const results = el.map(item => {
                                    expect(item.getAttribute('itemtype')).to.match(/^http(s)?:\/\/schema.org\/Article$/);
                                    return true;
                                }).filter(Boolean);
                                expect(results).not.to.be.empty;
                            },
                            tests: [
                                {
                                    slug: 'valid',
                                    name: "Article microdata is valid",
                                    func: (el, expect) => {
                                        const articles = el.map(obj => {
                                            try {
                                                expect(obj.getAttribute('itemtype')).to.match(/^https?:\/\/schema.org\/Article$/);
                                                return obj;
                                            } catch(e) {
                                                return false;
                                            }
                                        }).filter(Boolean);
                                        expect(articles).not.to.be.empty;
                                        articles.map(item => {
                                            const itemHeadline = item.querySelector('[itemprop="headline"]')?.innerText ?? '';
                                            const itemDatePublished = item.querySelector('[itemprop="datePublished"]')?.getAttribute('datetime') ?? '';
                                            const itemArticleBody = item.querySelector('[itemprop="articleBody"]')?.innerText ?? '';
                                            const images = [...item.querySelectorAll('[itemprop="image"]')].map(image => {
                                                return !!(image?.getAttribute('src') || image?.getAttribute('content'));
                                            })
                                            expect(itemHeadline, "headline").not.to.equal('');
                                            expect(itemDatePublished, "datePublished").not.to.equal('');
                                            expect(itemArticleBody, "articleBody").not.to.equal('');
                                            expect(images, "image").not.to.include(false);
                                        });
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