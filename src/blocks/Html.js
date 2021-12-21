const Html = {
    slug: "html",
    name: "HTML",
    sections: [
        {
            slug: 'general',
            name: "General HTML tags",
            tests: [
                {
                    slug: 'body',
                    name: "The page has body tag",
                    selector: 'body',
                    func: (el, expect) => {
                        expect(el).to.have.lengthOf(1);
                    }
                },
                {
                    slug: 'header',
                    name: "The page has header tag",
                    selector: 'header',
                    func: (el, expect) => {
                        let headers = [];
                        headers = el.map(node => {
                            const isBlockHeader = node.closest('article') || node.closest('main') || node.closest('section');
                            return !isBlockHeader;
                        });
                        headers = headers.filter(Boolean);
                        expect(headers).to.have.lengthOf(1);
                    }
                },
                {
                    slug: 'nav',
                    name: "The page has nav tag",
                    selector: 'nav',
                    func: (el, expect) => {
                        expect(el).not.to.be.empty;
                    },
                    tests: [
                        {
                            slug: 'links',
                            name: "All nav tags has links",
                            selector: 'nav',
                            func: (el, expect) => {
                                let hasLinks = [];
                                hasLinks = el.map(node => {
                                    const links = node.querySelectorAll('a');
                                    return links.length > 0 ? "yes" : "no";
                                });
                                expect(hasLinks).not.to.include("no");
                            }
                        }
                    ]
                },
                {
                    slug: 'main',
                    name: "The page has main tag",
                    selector: 'main',
                    iswarning: true,
                    func: (el, expect) => {
                        expect(el).not.to.be.empty;
                    },
                    tests: [
                        {
                            slug: 'one',
                            name: "The page has only one main tag",
                            func: (el, expect) => {
                                expect(el).to.have.lengthOf(1);
                            }
                        }
                    ]
                },
                {
                    slug: 'h1',
                    name: "The page has H1 tag",
                    selector: 'h1',
                    func: (el, expect) => {
                        expect(el).not.to.be.empty;
                    },
                    tests: [
                        {
                            slug: 'one',
                            name: "There is only one H1 tag",
                            func: (el, expect) => {
                                expect(el).to.have.lengthOf(1);
                            }
                        }
                    ]
                },
                {
                    slug: 'article',
                    name: "The page has article tags",
                    selector: 'article',
                    iswarning: true,
                    func: (el, expect) => {
                        expect(el).not.to.be.empty;
                    },
                    tests: [
                        {
                            slug: 'title',
                            name: "Each article title (h1...h6)",
                            iswarning: true,
                            func: (el, expect) => {
                                const hasHTag = el.map(node => {
                                    const cloned = node.cloneNode(true);
                                    cloned.querySelectorAll('section, article').forEach((el) => {
                                        el.remove();
                                    });
                                    const hTag = cloned.querySelector('h1, h2, h3, h4, h5, h6');
                                    return hTag ? "yes" : "no";
                                });
                                expect(hasHTag).not.to.include("no");
                            }
                        },
                        {
                            slug: 'time',
                            name: "Each article has time tag",
                            iswarning: true,
                            func: (el, expect) => {
                                const hasTime = el.map(node => {
                                    const cloned = node.cloneNode(true);
                                    cloned.querySelectorAll('section, article').forEach((el) => {
                                        el.remove();
                                    });
                                    const timeTag = cloned.querySelector('time');
                                    return timeTag ? "yes" : "no";
                                });
                                expect(hasTime).not.to.include("no");
                            }
                        }
                    ]
                },
                {
                    slug: 'section',
                    name: "The page has section tags",
                    selector: 'section',
                    iswarning: true,
                    func: (el, expect) => {
                        expect(el).not.to.be.empty;
                    },
                    tests: [
                        {
                            slug: 'title',
                            name: "Each section has title (h1...h6)",
                            iswarning: true,
                            func: (el, expect) => {
                                const hasHTag = el.map(node => {
                                    const cloned = node.cloneNode(true);
                                    cloned.querySelectorAll('section, article').forEach((el) => {
                                        el.remove();
                                    });
                                    const hTag = cloned.querySelector('h1, h2, h3, h4, h5, h6');
                                    return hTag ? "yes" : "no";
                                });
                                expect(hasHTag).not.to.include("no");
                            }
                        }
                    ]
                },
                {
                    slug: 'aside',
                    name: "The page has sidebars",
                    selector: 'aside',
                    iswarning: true,
                    func: (el, expect) => {
                        expect(el).not.to.be.empty;
                    }
                },
                {
                    slug: 'footer',
                    name: "The page has footer",
                    selector: 'footer',
                    func: (el, expect) => {
                        let footers = [];
                        footers = el.map(node => {
                            const isBlockHeader = node.closest('article') || node.closest('section');
                            return !isBlockHeader;
                        });
                        footers = footers.filter(Boolean);
                        expect(footers).to.have.lengthOf(1);
                    }
                },
                {
                    slug: 'img',
                    name: "The page has images",
                    selector: 'img',
                    iswarning: true,
                    func: (el, expect) => {
                        expect(el).not.to.be.empty;
                    },
                    tests: [
                        {
                            slug: 'alt',
                            name: "All images has alt attribute",
                            func: (el, expect) => {
                                let hasAlt = [];
                                hasAlt = el.map(node => {
                                    const alt = node?.getAttribute('alt') ?? '';
                                    return alt ? "yes" : "no";
                                });
                                expect(hasAlt).not.to.include("no");
                            }
                        }
                    ]
                },
                {
                    slug: 'pages',
                    name: "The page has pages links",
                    selector: '[rel="first"], [rel="last"], [rel="prev"], [rel="next"]',
                    iswarning: true,
                    func: (el, expect) => {
                        expect(el).not.to.be.empty;
                    }
                }
            ]
        },
        {
            slug: 'company',
            name: "Company information",
            tests: [
                {
                    slug: 'address',
                    name: "The page has company address",
                    selector: 'address',
                    iswarning: true,
                    func: (el, expect) => {
                        expect(el).not.to.be.empty;
                    }
                },
                {
                    slug: 'tel',
                    name: "The page has phone number",
                    selector: 'a[href^="tel:"]',
                    iswarning: true,
                    func: (el, expect) => {
                        expect(el).not.to.be.empty;
                    }
                },
                {
                    slug: 'email',
                    name: "The page has Email address",
                    selector: 'a[href^="mailto:"]',
                    iswarning: true,
                    func: (el, expect) => {
                        expect(el).not.to.be.empty;
                    }
                }
            ]
        }
    ]
}

export default Html