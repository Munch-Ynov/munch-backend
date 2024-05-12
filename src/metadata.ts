/* eslint-disable */
export default async () => {
    const t = {
        ["./data/models/auth.model"]: await import("./data/models/auth.model"),
        ["./data/models/reservation.model"]: await import("./data/models/reservation.model")
    };
    return { "@nestjs/swagger": { "models": [[import("./auth/dto/create-auth-user.dto"), { "CreateAuthUserDto": { email: { required: true, type: () => String }, role: { required: true, type: () => Object }, password: { required: true, type: () => String, minLength: 6 } } }], [import("./auth/dto/login-auth.dto"), { "LoginDto": { email: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 6 } } }], [import("./auth/entity/auth.entity"), { "AuthEntity": { accessToken: { required: true, type: () => String } } }], [import("./data/dto/reservation/reservation-create.dto"), { "ReservationCreateDto": { date: { required: true, type: () => Date }, nb_people: { required: true, type: () => Number }, userId: { required: true, type: () => String }, restaurantId: { required: true, type: () => String } }, "ExternalReservationCreateDto": { date: { required: true, type: () => Date }, nb_people: { required: true, type: () => Number }, restaurantId: { required: true, type: () => String } } }], [import("./data/dto/reservation/reservation-update.dto"), { "ReservationUpdateDto": { nb_people: { required: true, type: () => Number }, date: { required: true, type: () => Date } } }]], "controllers": [[import("./module/health/health.controller"), { "HealthController": { "check": { type: Object } } }], [import("./auth/auth.controller"), { "AuthController": { "login": {}, "register": { type: t["./data/models/auth.model"].Auth }, "logout": {}, "refresh": {}, "getProfile": { type: Object } } }], [import("./module/reservation/reservation.controller"), { "ReservationController": { "getReservationById": { type: t["./data/models/reservation.model"].Reservation }, "createReservation": { type: t["./data/models/reservation.model"].Reservation }, "createExternalReservation": { type: t["./data/models/reservation.model"].Reservation }, "updateReservationStatus": { type: t["./data/models/reservation.model"].Reservation }, "updateReservation": { type: t["./data/models/reservation.model"].Reservation } } }]] } };
};