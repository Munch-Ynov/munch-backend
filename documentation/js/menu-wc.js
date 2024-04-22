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
                                            'data-bs-target="#controllers-links-module-AppModule-398282d0bda4795838f087307df06de268eeef659a1142765f39805165d39527b36f00e3076ab34acac11d67f8decda397c49e20ee882deab8eac4b08b27f28c"' : 'data-bs-target="#xs-controllers-links-module-AppModule-398282d0bda4795838f087307df06de268eeef659a1142765f39805165d39527b36f00e3076ab34acac11d67f8decda397c49e20ee882deab8eac4b08b27f28c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-398282d0bda4795838f087307df06de268eeef659a1142765f39805165d39527b36f00e3076ab34acac11d67f8decda397c49e20ee882deab8eac4b08b27f28c"' :
                                            'id="xs-controllers-links-module-AppModule-398282d0bda4795838f087307df06de268eeef659a1142765f39805165d39527b36f00e3076ab34acac11d67f8decda397c49e20ee882deab8eac4b08b27f28c"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-398282d0bda4795838f087307df06de268eeef659a1142765f39805165d39527b36f00e3076ab34acac11d67f8decda397c49e20ee882deab8eac4b08b27f28c"' : 'data-bs-target="#xs-injectables-links-module-AppModule-398282d0bda4795838f087307df06de268eeef659a1142765f39805165d39527b36f00e3076ab34acac11d67f8decda397c49e20ee882deab8eac4b08b27f28c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-398282d0bda4795838f087307df06de268eeef659a1142765f39805165d39527b36f00e3076ab34acac11d67f8decda397c49e20ee882deab8eac4b08b27f28c"' :
                                        'id="xs-injectables-links-module-AppModule-398282d0bda4795838f087307df06de268eeef659a1142765f39805165d39527b36f00e3076ab34acac11d67f8decda397c49e20ee882deab8eac4b08b27f28c"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
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
                                <a href="modules/RepositoryModule.html" data-type="entity-link" >RepositoryModule</a>
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
                                <a href="classes/AuthPrismaRepository.html" data-type="entity-link" >AuthPrismaRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategoryPrismaRepository.html" data-type="entity-link" >CategoryPrismaRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/Favorite.html" data-type="entity-link" >Favorite</a>
                            </li>
                            <li class="link">
                                <a href="classes/FavoritePrismaRepository.html" data-type="entity-link" >FavoritePrismaRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/Pageable.html" data-type="entity-link" >Pageable</a>
                            </li>
                            <li class="link">
                                <a href="classes/PrismaRepository.html" data-type="entity-link" >PrismaRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/Reservation.html" data-type="entity-link" >Reservation</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReservationPrismaRepository.html" data-type="entity-link" >ReservationPrismaRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/Restaurant.html" data-type="entity-link" >Restaurant</a>
                            </li>
                            <li class="link">
                                <a href="classes/RestaurantFeature.html" data-type="entity-link" >RestaurantFeature</a>
                            </li>
                            <li class="link">
                                <a href="classes/RestaurantFeaturePrismaRepository.html" data-type="entity-link" >RestaurantFeaturePrismaRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/RestaurantPrismaRepository.html" data-type="entity-link" >RestaurantPrismaRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/RestaurateurPrismaRepository.html" data-type="entity-link" >RestaurateurPrismaRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/RestaurateurProfile.html" data-type="entity-link" >RestaurateurProfile</a>
                            </li>
                            <li class="link">
                                <a href="classes/Sort.html" data-type="entity-link" >Sort</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserPrismaRepository.html" data-type="entity-link" >UserPrismaRepository</a>
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
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
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
                                <a href="interfaces/AuthRepository.html" data-type="entity-link" >AuthRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategoryRepository.html" data-type="entity-link" >CategoryRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FavoriteRepository.html" data-type="entity-link" >FavoriteRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Mapper.html" data-type="entity-link" >Mapper</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Model.html" data-type="entity-link" >Model</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageableRequest.html" data-type="entity-link" >PageableRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Repository.html" data-type="entity-link" >Repository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReservationRepository.html" data-type="entity-link" >ReservationRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RestaurantFeatureRepository.html" data-type="entity-link" >RestaurantFeatureRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RestaurantRepository.html" data-type="entity-link" >RestaurantRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RestaurateurRepository.html" data-type="entity-link" >RestaurateurRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRepository.html" data-type="entity-link" >UserRepository</a>
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