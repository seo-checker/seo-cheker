const isValidJSON = (json) => {
    try {
        return JSON.parse(json);
    } catch (e) {
        return false;
    }
}

const isSchema = (obj) => {
    const regex = /^http(s)?:\/\/schema.org\//
    return regex.test(obj['@context']);
}

const getType = (obj) => {
    return obj['@type'] ?? false;
}

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
                                const results = el.map(item => {
                                    const content = item.innerText;
                                    return isValidJSON(content) ? 'valid' : 'invalid';
                                });
                                expect(results).not.to.include('invalid');
                            }
                        },
                        {
                            slug: 'breadcrumbs',
                            name: "Breadcrumbs JSON-LD exist",
                            iswarning: true,
                            func: (el, expect) => {
                                const results = el.map(item => {
                                    const content = item.innerText;
                                    const obj = isValidJSON(content);
                                    return !!(obj && isSchema(obj) && getType(obj) == 'BreadcrumbList');
                                }).filter(Boolean);
                                expect(results).not.to.be.empty;
                            },
                            tests: [
                                {
                                    slug: 'one',
                                    name: "There is only one breadcrumbs JSON-LD on page",
                                    func: (el, expect) => {
                                        const results = el.map(item => {
                                            const content = item.innerText;
                                            const obj = isValidJSON(content);
                                            return !!(getType(obj) == 'BreadcrumbList');
                                        }).filter(Boolean);
                                        expect(results).to.have.lengthOf(1);
                                    },
                                },
                                {
                                    slug: 'valid',
                                    name: "Breadcrumbs is valid",
                                    func: (el, expect) => {
                                        const results = el.map(item => {
                                            const content = item.innerText;
                                            const obj = isValidJSON(content);
                                            const items = obj['itemListElement'] ?? [];
                                            let pos = 1;
                                            if (
                                                !obj ||
                                                !isSchema(obj) ||
                                                getType(obj) != 'BreadcrumbList' ||
                                                !Array.isArray(items) ||
                                                !items.length
                                            ) return false;
                                            items.sort(function(a, b) {
                                                return parseInt(a['position']) - parseInt(b['position']);
                                            });
                                            for (let i = 0; i < items.length; i++) {
                                                const item = items[i];
                                                if (
                                                    item['@type'] !== 'ListItem' ||
                                                    parseInt(item['position']) !== pos ||
                                                    !item['name'] ||
                                                    !item['item']
                                                ) return false;
                                                pos++;
                                            }
                                            return true;
                                        });
                                        expect(results).not.to.include(false);
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
                            name: "Breadcrumbs microdata exist",
                            selector: '[itemtype*="BreadcrumbList"]',
                            iswarning: true,
                            func: (el, expect) => {
                                expect(el).not.to.be.empty;
                                const regex = /^http(s)?:\/\/schema.org\/BreadcrumbList$/;
                                const results = el.map(item => regex.test(item?.getAttribute('itemtype') ?? ''));
                                expect(results).not.to.include(false);
                            },
                            tests: [
                                {
                                    slug: 'one',
                                    name: "There is only one breadcrumbs microdata on page",
                                    func: (el, expect) => {
                                        expect(el).to.have.lengthOf(1);
                                    },
                                },
                                {
                                    slug: 'valid',
                                    name: "Breadcrumbs microdata is valid",
                                    func: (el, expect) => {
                                        const results = el.map(item => {
                                            const items = item.querySelectorAll('[itemprop="itemListElement"][itemscope]');
                                            if (!items.length)
                                                return false;

                                            for (let pos = 1; pos <= items.length; pos++) {
                                                const item = items[pos - 1];
                                                const itemType = item?.getAttribute('itemtype') ?? '';
                                                const regex = /^http(s)?:\/\/schema.org\/ListItem$/;
                                                if (!regex.test(itemType))
                                                    return false;

                                                const itemItem = item.querySelector('a[itemprop="item"]') ?? (items.length === pos); // Last item may not have an item element
                                                const itemName = item.querySelector('[itemprop="name"]')?.innerText ?? null;
                                                const itemPosition = parseInt(item.querySelector('[itemprop="position"]')?.getAttribute('content') ?? 0);

                                                if (
                                                    !itemItem ||
                                                    !itemName ||
                                                    itemPosition !== pos
                                                )
                                                    return false;
                                            };
                                            return true;
                                        });
                                        expect(results).not.to.include(false);
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