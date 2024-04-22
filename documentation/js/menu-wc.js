'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">munch-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-8ab5f537a659f17e7f1352f4386dd95236e399ff4f79f1420cccbef252a8f73918424f2d84a053038456b9fd938f7fc6848bc4d0f70470cf20b529f69d54f604"' : 'data-bs-target="#xs-controllers-links-module-AppModule-8ab5f537a659f17e7f1352f4386dd95236e399ff4f79f1420cccbef252a8f73918424f2d84a053038456b9fd938f7fc6848bc4d0f70470cf20b529f69d54f604"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-8ab5f537a659f17e7f1352f4386dd95236e399ff4f79f1420cccbef252a8f73918424f2d84a053038456b9fd938f7fc6848bc4d0f70470cf20b529f69d54f604"' :
                                            'id="xs-controllers-links-module-AppModule-8ab5f537a659f17e7f1352f4386dd95236e399ff4f79f1420cccbef252a8f73918424f2d84a053038456b9fd938f7fc6848bc4d0f70470cf20b529f69d54f604"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-8ab5f537a659f17e7f1352f4386dd95236e399ff4f79f1420cccbef252a8f73918424f2d84a053038456b9fd938f7fc6848bc4d0f70470cf20b529f69d54f604"' : 'data-bs-target="#xs-injectables-links-module-AppModule-8ab5f537a659f17e7f1352f4386dd95236e399ff4f79f1420cccbef252a8f73918424f2d84a053038456b9fd938f7fc6848bc4d0f70470cf20b529f69d54f604"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-8ab5f537a659f17e7f1352f4386dd95236e399ff4f79f1420cccbef252a8f73918424f2d84a053038456b9fd938f7fc6848bc4d0f70470cf20b529f69d54f604"' :
                                        'id="xs-injectables-links-module-AppModule-8ab5f537a659f17e7f1352f4386dd95236e399ff4f79f1420cccbef252a8f73918424f2d84a053038456b9fd938f7fc6848bc4d0f70470cf20b529f69d54f604"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabaseModule-f9332f14e03079e5004aa33f1794d0cf4a2dddf14e0dbea9267f88b83d1b9732b1274282b390cc78490b6b3a35b8bc42f9dcb197fae074997e6347499d8aa8f6"' : 'data-bs-target="#xs-injectables-links-module-DatabaseModule-f9332f14e03079e5004aa33f1794d0cf4a2dddf14e0dbea9267f88b83d1b9732b1274282b390cc78490b6b3a35b8bc42f9dcb197fae074997e6347499d8aa8f6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabaseModule-f9332f14e03079e5004aa33f1794d0cf4a2dddf14e0dbea9267f88b83d1b9732b1274282b390cc78490b6b3a35b8bc42f9dcb197fae074997e6347499d8aa8f6"' :
                                        'id="xs-injectables-links-module-DatabaseModule-f9332f14e03079e5004aa33f1794d0cf4a2dddf14e0dbea9267f88b83d1b9732b1274282b390cc78490b6b3a35b8bc42f9dcb197fae074997e6347499d8aa8f6"' }>
                                        <li class="link">
                                            <a href="injectables/DatabaseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabaseService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HashModule.html" data-type="entity-link" >HashModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-HashModule-92fddae143ded945b629b67c8fece644939bb3df6a9f201253421266636fd40f2e412d0a3e577b225e0af7369621f82de7075b4415ee14c50c853e56a2eb270d"' : 'data-bs-target="#xs-injectables-links-module-HashModule-92fddae143ded945b629b67c8fece644939bb3df6a9f201253421266636fd40f2e412d0a3e577b225e0af7369621f82de7075b4415ee14c50c853e56a2eb270d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HashModule-92fddae143ded945b629b67c8fece644939bb3df6a9f201253421266636fd40f2e412d0a3e577b225e0af7369621f82de7075b4415ee14c50c853e56a2eb270d"' :
                                        'id="xs-injectables-links-module-HashModule-92fddae143ded945b629b67c8fece644939bb3df6a9f201253421266636fd40f2e412d0a3e577b225e0af7369621f82de7075b4415ee14c50c853e56a2eb270d"' }>
                                        <li class="link">
                                            <a href="injectables/HashService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HashService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-e3fe8f93a67e7e1b6cd98d7dcf15b43a0e7d205062a513579dffc63abced515dd0d504217931e5cd462d1141531a265c1b89127d8d6e5b90ba4b402fea7c8a52"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-e3fe8f93a67e7e1b6cd98d7dcf15b43a0e7d205062a513579dffc63abced515dd0d504217931e5cd462d1141531a265c1b89127d8d6e5b90ba4b402fea7c8a52"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-e3fe8f93a67e7e1b6cd98d7dcf15b43a0e7d205062a513579dffc63abced515dd0d504217931e5cd462d1141531a265c1b89127d8d6e5b90ba4b402fea7c8a52"' :
                                            'id="xs-controllers-links-module-HealthModule-e3fe8f93a67e7e1b6cd98d7dcf15b43a0e7d205062a513579dffc63abced515dd0d504217931e5cd462d1141531a265c1b89127d8d6e5b90ba4b402fea7c8a52"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SeederModule.html" data-type="entity-link" >SeederModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SeederModule-e77234691ece7ca9572e5204f3ea76a5e7b31a7626a1ece922e0d11160a819d5a6f2b3fbb1b8368b8ce6245de49582babc7f161fc8a6fca542d7910a436dfb2f"' : 'data-bs-target="#xs-injectables-links-module-SeederModule-e77234691ece7ca9572e5204f3ea76a5e7b31a7626a1ece922e0d11160a819d5a6f2b3fbb1b8368b8ce6245de49582babc7f161fc8a6fca542d7910a436dfb2f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SeederModule-e77234691ece7ca9572e5204f3ea76a5e7b31a7626a1ece922e0d11160a819d5a6f2b3fbb1b8368b8ce6245de49582babc7f161fc8a6fca542d7910a436dfb2f"' :
                                        'id="xs-injectables-links-module-SeederModule-e77234691ece7ca9572e5204f3ea76a5e7b31a7626a1ece922e0d11160a819d5a6f2b3fbb1b8368b8ce6245de49582babc7f161fc8a6fca542d7910a436dfb2f"' }>
                                        <li class="link">
                                            <a href="injectables/SeederService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SeederService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatabaseHandler.html" data-type="entity-link" >DatabaseHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/Favorite.html" data-type="entity-link" >Favorite</a>
                            </li>
                            <li class="link">
                                <a href="classes/Reservation.html" data-type="entity-link" >Reservation</a>
                            </li>
                            <li class="link">
                                <a href="classes/Restaurant.html" data-type="entity-link" >Restaurant</a>
                            </li>
                            <li class="link">
                                <a href="classes/RestaurantFeature.html" data-type="entity-link" >RestaurantFeature</a>
                            </li>
                            <li class="link">
                                <a href="classes/RestaurateurProfile.html" data-type="entity-link" >RestaurateurProfile</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserProfile.html" data-type="entity-link" >UserProfile</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabaseService.html" data-type="entity-link" >DatabaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HashService.html" data-type="entity-link" >HashService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SeederService.html" data-type="entity-link" >SeederService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Entity.html" data-type="entity-link" >Entity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Model.html" data-type="entity-link" >Model</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Pageable.html" data-type="entity-link" >Pageable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageableRequest.html" data-type="entity-link" >PageableRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageableResponse.html" data-type="entity-link" >PageableResponse</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});