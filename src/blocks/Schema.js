const getJSON = (json) => {
    try {
        return JSON.parse(json);
    } catch (e) {
        return false;
    }
}

const getVal = (item) => {
    return (item?.innerText || item?.getAttribute('content')) ?? '';
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
                            results: (el) => {
                                return el.map(item => {
                                    const content = item.innerText;
                                    return content.indexOf('BreadcrumbList') !== -1 ? item.outerHTML : false;
                                }).filter(Boolean).join("\n");
                            },
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
                            results: (el) => {
                                return el.map(item => {
                                    const content = item.innerText;
                                    return content.indexOf('NewsArticle') !== -1 ? item.outerHTML : false;
                                }).filter(Boolean).join("\n");
                            },
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
                        },
                        {
                            slug: 'products',
                            name: "Products JSON-LD exists on page",
                            iswarning: true,
                            results: (el) => {
                                return el.map(item => {
                                    const content = item.innerText;
                                    return content.indexOf('Product') !== -1 ? item.outerHTML : false;
                                }).filter(Boolean).join("\n");
                            },
                            func: (el, expect) => {
                                const results = el.map(item => {
                                    try {
                                        const content = item.innerText;
                                        const obj = getJSON(content);
                                        expect(obj).to.be.an.instanceof(Object);
                                        expect(obj, '@context').to.have.property('@context').and.match(schemaRegex);
                                        expect(obj, '@type').to.have.property('@type').to.equal('Product');
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
                                    name: "Products JSON-LD is valid",
                                    func: (el, expect) => {
                                        const products = el.map(item => {
                                            try {
                                                const content = item.innerText;
                                                const obj = getJSON(content);
                                                expect(obj).to.be.an.instanceof(Object);
                                                expect(obj, '@context').to.have.property('@context').and.match(schemaRegex);
                                                expect(obj, '@type').to.have.property('@type').to.equal('Product');
                                                return obj;
                                            } catch(e) {
                                                return false;
                                            }
                                        }).filter(Boolean);
                                        products.map(product => {
                                            expect(product, 'name').to.have.property('name').and.not.to.be.empty;
                                            const { review, aggregateRating, offers } = product;
                                            expect([!!review, !!aggregateRating, !!offers], 'review, aggregateRating, offers').to.include(true);
                                            if (review) {
                                                expect(review, 'review @type').to.have.property('@type').to.equal('Review');
                                                const { reviewRating, author } = review;
                                                expect([!!reviewRating, !!author], 'reviewRating, author').not.to.include(false);
                                                expect(reviewRating, 'reviewRating @type').to.have.property('@type').to.equal('Rating');
                                                expect(reviewRating, 'reviewRating ratingValue').to.have.property('ratingValue');
                                                expect(author, 'author @type').to.have.property('@type').to.contain.oneOf(['Person', 'Organization']);
                                                expect(author, 'author name').to.have.property('name');
                                            }
                                            if (aggregateRating) {
                                                expect(aggregateRating, 'aggregateRating @type').to.have.property('@type').to.equal('AggregateRating');
                                                expect(aggregateRating, 'aggregateRating ratingValue').to.have.property('ratingValue');
                                                expect(aggregateRating, 'aggregateRating reviewCount').to.have.property('reviewCount');
                                            }
                                            if (offers) {
                                                expect(offers, 'offers @type').to.have.property('@type').to.contain.oneOf(['Offer', 'AggregateOffer']);
                                                if (offers['@type'] === 'Offer') {
                                                    expect(offers, 'offer price').to.have.property('price');
                                                } else {
                                                    expect(offers, 'offers lowPrice').to.have.property('lowPrice');
                                                    expect(offers, 'offers priceCurrency').to.have.property('priceCurrency');
                                                }
                                            }
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
                            results: true,
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
                                            const itemName = item.querySelector('[itemprop="name"]');
                                            const itemPosition = parseInt(getVal(item.querySelector('[itemprop="position"]')));
                                            expect(itemItem, "item").to.be.true;
                                            expect(getVal(itemName), "name").not.to.equal('');
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
                            results: true,
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
                                            const itemHeadline = item.querySelector('[itemprop="headline"]');
                                            const itemDatePublished = item.querySelector('[itemprop="datePublished"]');
                                            const itemArticleBody = item.querySelector('[itemprop="articleBody"]');
                                            const images = [...item.querySelectorAll('[itemprop="image"]')].map(image => {
                                                return !!(image?.getAttribute('src') || image?.getAttribute('content'));
                                            })
                                            expect(getVal(itemHeadline), "headline").not.to.equal('');
                                            expect(getVal(itemDatePublished), "datePublished").not.to.equal('');
                                            expect(getVal(itemArticleBody), "articleBody").not.to.equal('');
                                            expect(images, "image").not.to.include(false);
                                        });
                                    },
                                }
                            ]
                        },
                        {
                            slug: 'products',
                            name: "Products microdata exists on page",
                            selector: '[itemtype*="Product"]',
                            iswarning: true,
                            results: true,
                            func: (el, expect) => {
                                expect(el).not.to.be.empty;
                                const results = el.map(item => {
                                    expect(item.getAttribute('itemtype')).to.match(/^http(s)?:\/\/schema.org\/Product$/);
                                    return true;
                                }).filter(Boolean);
                                expect(results).not.to.be.empty;
                            },
                            tests: [
                                {
                                    slug: 'valid',
                                    name: "Product microdata is valid",
                                    func: (el, expect) => {
                                        const products = el.map(obj => {
                                            try {
                                                expect(obj.getAttribute('itemtype')).to.match(/^https?:\/\/schema.org\/Product$/);
                                                return obj;
                                            } catch(e) {
                                                return false;
                                            }
                                        }).filter(Boolean);
                                        expect(products).not.to.be.empty;
                                        products.map(item => {
                                            const name = item.querySelector('[itemprop="name"]');
                                            expect(getVal(name), "name").not.to.equal('');

                                            const review = item.querySelector('[itemprop="review"]');
                                            const aggregateRating = item.querySelector('[itemprop="aggregateRating"]');
                                            const offers = item.querySelector('[itemprop="offers"]');
                                            expect([!!review, !!aggregateRating, !!offers], 'review, aggregateRating, offers').to.include(true);

                                            if (review) {
                                                expect(review.getAttribute('itemtype')).to.match(/^https?:\/\/schema.org\/Review$/);
                                                const author = review.querySelector('[itemprop="author"]');
                                                const reviewRating = review.querySelector('[itemprop="reviewRating"]');

                                                expect(author.getAttribute('itemtype'), 'author itemtype').to.match(/^https?:\/\/schema.org\/(Person|Organization)$/);
                                                expect(reviewRating.getAttribute('itemtype')).to.match(/^https?:\/\/schema.org\/Rating$/);

                                                const name = author.querySelector('[itemprop="name"]');
                                                expect(getVal(name), 'author name').not.to.equal('');

                                                const ratingValue = reviewRating.querySelector('[itemprop="ratingValue"]');
                                                expect(getVal(ratingValue), 'reviewRating ratingValue').not.to.equal('');
                                            }
                                            if (aggregateRating) {
                                                expect(aggregateRating.getAttribute('itemtype')).to.match(/^https?:\/\/schema.org\/AggregateRating$/);

                                                const ratingValue = aggregateRating.querySelector('[itemprop="ratingValue"]');
                                                const reviewCount = aggregateRating.querySelector('[itemprop="reviewCount"]');

                                                expect(getVal(ratingValue), 'aggregateRating ratingValue').not.to.equal('');
                                                expect(getVal(reviewCount), 'aggregateRating reviewCount').not.to.equal('');
                                            }
                                            if (offers) {
                                                expect(offers.getAttribute('itemtype')).to.match(/^https?:\/\/schema.org\/(Offer|AggregateOffer)$/);
                                                if (offers.getAttribute('itemtype').match(/^https?:\/\/schema.org\/Offer$/)) {
                                                    const price = offers.querySelector('[itemprop="price"]');
                                                    expect(getVal(price), 'offers price').not.to.equal('');
                                                } else {
                                                    const lowPrice = offers.querySelector('[itemprop="lowPrice"]');
                                                    const priceCurrency = offers.querySelector('[itemprop="priceCurrency"]');
                                                    expect(getVal(price), 'offers price').not.to.equal('');
                                                    expect(getVal(priceCurrency), 'offers priceCurrency').not.to.equal('');
                                                }
                                            }
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