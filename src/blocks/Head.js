export const Header = {
    slug: "head",
    name: "Header",
    sections: [
        {
            slug: 'title',
            name: "Page title",
            selector: "title",
            tests: [
                {
                    slug: 'exists',
                    selector: "head > title",
                    name: "The page has title tag",
                    results: true,
                    func: (el, expect) => {
                        expect(el).to.exist;
                    },
                    tests: [
                        {
                            slug: 'one',
                            name: "There is only one title tag on the page",
                            func: (el, expect) => {
                                expect(el).to.have.lengthOf(1);
                            }
                        },
                        {
                            slug: 'notempty',
                            name: "Title not empty",
                            func: (el, expect) => {
                                const content = el[0]?.innerHTML ?? '';
                                expect(content).not.to.be.empty;
                            },
                            tests: [
                                {
                                    slug: 'length',
                                    name: "Title length from 50 to 60 characters",
                                    iswarning: true,
                                    func: (el, expect) => {
                                        const content = el[0].innerHTML.replace(/(\r\n|\n|\r)/gm, "");
                                        expect(content).to.have.lengthOf.within(50,60);
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            slug: 'meta',
            name: "Meta tags",
            tests: [
                {
                    slug: 'author',
                    name: "The page has author meta tag",
                    selector: "head > meta[name='author']",
                    iswarning: true,
                    func: (el, expect) => {
                        expect(el).to.have.lengthOf(1);
                        const content = el[0]?.getAttribute('content') ?? '';
                        expect(content).not.to.be.empty;
                    }
                },
                {
                    slug: 'description',
                    name: "The page has description meta tag",
                    selector: "head > meta[name='description']",
                    results: true,
                    func: (el, expect) => {
                        expect(el).to.have.lengthOf(1);
                        const content = el[0]?.getAttribute('content') ?? '';
                        expect(content).not.to.be.empty;
                    },
                    tests: [
                        {
                            slug: 'length',
                            name: "Description length from 50 to 160 characters",
                            selector: "meta[name='description']",
                            iswarning: true,
                            func: (el, expect) => {
                                const content = el[0]?.getAttribute('content') ?? '';
                                expect(content).to.have.lengthOf.within(50,160)
                            }
                        },
                    ]
                },
                {
                    slug: 'robots',
                    name: "The page has robots meta tag",
                    selector: "head > meta[name='robots']",
                    iswarning: true,
                    results: true,
                    func: (el, expect) => {
                        expect(el).to.have.lengthOf(1);
                    },
                    tests: [
                        {
                            slug: 'indexing',
                            name: "Indexing enabled by robots tag",
                            func: (el, expect) => {
                                const content = el[0]?.getAttribute('content') ?? '';
                                if (!content)
                                    return;
                                let params = content.split(',').map(param => {
                                    return param.trim().toLowerCase();
                                });
                                expect(params).not.to.include('noindex');
                            }
                        },
                        {
                            slug: 'following',
                            name: "Following enabled by robots tag",
                            func: (el, expect) => {
                                const content = el[0]?.getAttribute('content') ?? '';
                                if (!content)
                                    return;
                                let params = content.split(',').map(param => {
                                    return param.trim().toLowerCase();
                                });
                                expect(params).not.to.include('nofollow');
                            }
                        },
                    ]
                },
            ]
        },
        {
            slug: 'opengraph',
            name: "Open Graph tags",
            selector: "meta[property^='og:']",
            tests: [
                {
                    slug: 'exists',
                    name: "The page has Open Graph meta tags",
                    results: true,
                    func: (el, expect) => {
                        expect(el).not.to.be.empty;
                    },
                    tests: [
                        {
                            slug: 'title',
                            name: "Title opegraph meta",
                            selector: "meta[property^='og:title']",
                            func: (el, expect) => {
                                expect(el).not.to.be.empty;
                            }
                        },
                        {
                            slug: 'description',
                            name: "Description opegraph meta",
                            selector: "meta[property^='og:description']",
                            func: (el, expect) => {
                                expect(el).not.to.be.empty;
                            }
                        },
                        {
                            slug: 'image',
                            name: "Image opegraph meta",
                            selector: "meta[property^='og:image']",
                            func: (el, expect) => {
                                expect(el).not.to.be.empty;
                            }
                        }
                    ]
                }
            ]
        },
        {
            slug: 'hreflang',
            name: "Alternate languages",
            selector: "link[rel='alternate'][hreflang]",
            tests: [
                {
                    slug: 'exists',
                    name: "The page has alternate languages",
                    iswarning: true,
                    results: true,
                    func: (el, expect) => {
                        expect(el).not.to.be.empty;
                    }
                }
            ]
        }
    ]
}

export default Header