/* eslint-disable */
export default async () => {
    const t = {
        ['./module/auth/roles/dto/create-profile.dto']: await import(
            './module/auth/roles/dto/create-profile.dto'
        ),
    }
    return {
        '@nestjs/swagger': {
            models: [
                [
                    import('./module/auth/roles/dto/create-profile.dto'),
                    {
                        CreateProfileDto: {
                            name: { required: true, type: () => String },
                            avatar: {
                                required: true,
                                type: () => String,
                                nullable: true,
                            },
                            banner: {
                                required: true,
                                type: () => String,
                                nullable: true,
                            },
                        },
                    },
                ],
                [
                    import('./module/auth/dto/register.dto'),
                    {
                        RegisterDto: {
                            email: { required: true, type: () => String },
                            role: { required: true, type: () => Object },
                            password: {
                                required: true,
                                type: () => String,
                                minLength: 8,
                            },
                            profile: {
                                required: true,
                                type: () =>
                                    t[
                                        './module/auth/roles/dto/create-profile.dto'
                                    ].CreateProfileDto,
                                nullable: true,
                            },
                        },
                    },
                ],
                [
                    import('./module/auth/dto/login.dto'),
                    {
                        LoginDto: {
                            email: { required: true, type: () => String },
                            password: {
                                required: true,
                                type: () => String,
                                minLength: 6,
                            },
                        },
                    },
                ],
                [
                    import('./module/auth/dto/token.dto'),
                    {
                        TokenDto: {
                            accessToken: { required: true, type: () => String },
                        },
                    },
                ],
                [
                    import(
                        './module/auth/roles/restaurateur/dto/create-restaurateur.dto'
                    ),
                    {
                        CreateRestaurateurDto: {
                            name: { required: true, type: () => String },
                            phone: {
                                required: true,
                                type: () => String,
                                nullable: true,
                            },
                        },
                    },
                ],
                [
                    import('./module/auth/roles/user/dto/create-user.dto'),
                    {
                        CreateUserDto: {
                            name: { required: true, type: () => String },
                            phone: {
                                required: true,
                                type: () => String,
                                nullable: true,
                            },
                        },
                    },
                ],
                [
                    import('./module/restaurant/dto/create-restaurant.dto'),
                    {
                        CreateRestaurantDto: {
                            name: { required: true, type: () => String },
                            description: { required: true, type: () => String },
                            address: { required: true, type: () => String },
                            price: { required: true, type: () => String },
                            n_siret: { required: true, type: () => String },
                            phone: { required: true, type: () => String },
                            code_postal: { required: true, type: () => String },
                            city: { required: true, type: () => String },
                            email: { required: true, type: () => String },
                            features: { required: true, type: () => [String] },
                            favorites: { required: true, type: () => [String] },
                            reservations: {
                                required: true,
                                type: () => [String],
                            },
                        },
                    },
                ],
                [
                    import('./module/restaurant/dto/update-restaurant.dto'),
                    {
                        UpdateRestaurantDto: {
                            name: { required: true, type: () => String },
                            description: { required: true, type: () => String },
                            address: { required: true, type: () => String },
                            price: { required: true, type: () => String },
                            n_siret: { required: true, type: () => String },
                            phone: { required: true, type: () => String },
                            code_postal: { required: true, type: () => String },
                            city: { required: true, type: () => String },
                            email: { required: true, type: () => String },
                            features: { required: true, type: () => [String] },
                            favorites: { required: true, type: () => [String] },
                            reservations: {
                                required: true,
                                type: () => [String],
                            },
                        },
                    },
                ],
                [
                    import('./module/auth/roles/dto/profile.dto'),
                    {
                        ProfileDto: {
                            name: { required: false, type: () => String },
                            avatar: { required: false, type: () => String },
                            banner: { required: false, type: () => String },
                        },
                    },
                ],
                [
                    import('./module/reservation/dto/reservation-create.dto'),
                    {
                        ReservationCreateDto: {
                            date: { required: true, type: () => Date },
                            nb_people: { required: true, type: () => Number },
                            userId: { required: true, type: () => String },
                            restaurantId: {
                                required: true,
                                type: () => String,
                            },
                        },
                        ExternalReservationCreateDto: {
                            date: { required: true, type: () => Date },
                            nb_people: { required: true, type: () => Number },
                            restaurantId: {
                                required: true,
                                type: () => String,
                            },
                        },
                    },
                ],
                [
                    import('./module/reservation/dto/reservation-update.dto'),
                    {
                        ReservationUpdateDto: {
                            nb_people: { required: false, type: () => Number },
                            date: { required: false, type: () => Date },
                            status: { required: false, type: () => Object },
                        },
                    },
                ],
                [
                    import('./module/features/dto/create-feature.dto'),
                    {
                        CreateFeatureDto: {
                            name: { required: true, type: () => String },
                            icon: { required: false, type: () => String },
                            categoryId: { required: true, type: () => String },
                        },
                    },
                ],
                [
                    import('./module/features/dto/update-feature.dto'),
                    {
                        UpdateFeatureDto: {
                            name: { required: true, type: () => String },
                            icon: { required: false, type: () => String },
                            categoryId: { required: true, type: () => String },
                        },
                    },
                ],
                [
                    import(
                        './module/auth/roles/restaurateur/dto/restaurateur.dto'
                    ),
                    {
                        RestaurateurDto: {
                            restaurants: {
                                required: true,
                                type: () => [String],
                            },
                        },
                    },
                ],
                [
                    import('./module/auth/roles/user/dto/user.dto'),
                    {
                        UserDto: {
                            phone: {
                                required: true,
                                type: () => String,
                                nullable: true,
                            },
                        },
                    },
                ],
                [
                    import('./module/features/entities/feature.entity'),
                    { Feature: {} },
                ],
            ],
            controllers: [
                [
                    import('./module/auth/auth.controller'),
                    {
                        AuthController: {
                            login: {},
                            register: {},
                            logout: {},
                            refresh: {},
                            getProfile: { type: Object },
                            getProfileById: { type: Object },
                        },
                    },
                ],
                [
                    import('./module/restaurant/restaurant.controller'),
                    {
                        RestaurantController: {
                            create: {},
                            findAll: {},
                            findAllByOwner: { type: Object },
                            findOne: {},
                            update: {},
                            remove: {},
                        },
                    },
                ],
                [
                    import('./module/auth/roles/profile.controller'),
                    {
                        ProfileController: {
                            getProfile: { type: Object },
                            updateProfileByToken: { type: Object },
                            updateProfile: { type: Object },
                            getProfilesByRole: { type: Object },
                        },
                    },
                ],
                [
                    import('./module/health/health.controller'),
                    { HealthController: { check: { type: Object } } },
                ],
                [
                    import(
                        './module/reservation/controller/reservation.controller'
                    ),
                    {
                        ReservationController: {
                            getReservationById: {},
                            createReservation: {},
                            updateReservationStatus: {},
                            updateReservation: {},
                            getUserReservations: {},
                            getRestaurantReservations: {},
                            deleteReservation: {},
                            getUpcomingReservations: {},
                        },
                    },
                ],
                [
                    import('./module/mailing/mailing.controller'),
                    { MailingController: { send: {} } },
                ],
                [
                    import('./module/features/features.controller'),
                    {
                        FeaturesController: {
                            create: {},
                            findAll: { type: [Object] },
                            findOne: {},
                            update: {},
                            remove: {},
                        },
                    },
                ],
                [
                    import('./module/favorite/controller/favorite.controller'),
                    {
                        FavoriteController: {
                            addFavorite: {},
                            removeFavorite: { type: Object },
                            getFavorites: {},
                        },
                    },
                ],
            ],
        },
    }
}
