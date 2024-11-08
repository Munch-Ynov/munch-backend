import { Controller, Logger, UseGuards } from '@nestjs/common'
import {
    Body,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Query,
} from '@nestjs/common/decorators/http'
import {
    ExternalReservationCreateDto,
    ReservationCreateDto,
} from '@/module/reservation/dto/reservation-create.dto'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/guard/jwt-auth.guard'
import { RolesGuard } from '@/guard/roles.guard'
import { ReservationService } from '../service/reservation.service'
import { ReservationUpdateDto } from '../dto/reservation-update.dto'
import { Reservation, ReservationStatus } from '@prisma/client'
import { Pageable, Sort } from '@/data/util'

@Controller('reservation')
@ApiTags('reservation', 'API')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}

    /**
     * Get reservation by id
     */
    @Get(':reservationId')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getReservationById(@Param('reservationId') reservationId: string) {
        return this.reservationService.getReservationById(reservationId)
    }

    /**
     * Create a new reservation for a user
     */
    @Post()
    @ApiBody({ type: ReservationCreateDto })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    async createReservation(@Body() reservation: ReservationCreateDto) {
        if (!reservation) {
            throw new Error('Reservation not provided')
        }
        Logger.log(`Creating reservation : ${JSON.stringify(reservation)}`)
        return this.reservationService.createReservation(reservation)
    }

    // /**
    //  * Create a new External reservation
    //  */
    // @Post('external')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @ApiBearerAuth()
    // @ApiBody({ type: ExternalReservationCreateDto })
    // async createExternalReservation(
    //     @Body() reservation: ExternalReservationCreateDto
    // ) {
    //     return this.reservationService.createExternalReservation(reservation)
    // }

    /**
     * Update a reservation status
     */
    @Patch(':reservationId/status')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    async updateReservationStatus(
        @Param('reservationId') reservationId: string,
        @Body('status') status: ReservationStatus
    ) {
        return this.reservationService.updateReservationStatus(
            reservationId,
            status
        )
    }

    /**
     * Update a reservation
     * Status must be PENDING
     */
    @Patch(':reservationId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiBody({ type: ReservationUpdateDto })
    async updateReservation(
        @Param('reservationId') reservationId: string,
        @Body() reservation: ReservationUpdateDto
    ) {
        return this.reservationService.updateReservation({
            ...reservation,
            id: reservationId,
        })
    }

    // get all reservation for a given user
    @Get('user/:userId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    async getUserReservations(
        @Param('userId') userId: string,
        @Query('page') page = 0,
        @Query('size') size = 10,
        @Query('sort') sort = 'createdAt,desc',
        @Query('upcoming') upcoming = 'true',
        @Query('past') past = 'true',
        @Query('available') available = 'false'
    ): Promise<Pageable<Reservation>> {
        return this.reservationService.getUserReservations(
            userId,
            {
                page,
                size,
                sort: Sort.of(sort),
            },
            {
                past: past !== 'false',
                upcoming: upcoming !== 'false',
                available: available !== 'false',
            }
        )
    }

    // get all reservations for a given restaurant
    @Get('restaurant/:restaurantId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    async getRestaurantReservations(
        @Param('restaurantId') restaurantId: string,
        @Query('page') page = 0,
        @Query('size') size = 10,
        @Query('sort') sort = 'createdAt,desc',
        @Query('upcoming') upcoming = 'true',
        @Query('past') past = 'true',
        @Query('available') available = 'false'
    ): Promise<Pageable<Reservation>> {
        return this.reservationService.getRestaurantReservations(
            restaurantId,
            {
                page,
                size,
                sort: Sort.of(sort),
            },
            {
                past: past !== 'false',
                upcoming: upcoming !== 'false',
                available: available !== 'false',
            }
        )
    }

    // delete a reservation
    @Delete(':reservationId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    async deleteReservation(@Param('reservationId') reservationId: string) {
        return this.reservationService.deleteReservation(reservationId)
    }

    // get upcoming reservations for a given restaurant
    @Get('restaurant/:restaurantId/upcoming')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    async getUpcomingReservations(
        @Param('restaurantId') restaurantId: string,
        @Query('page') page = 0,
        @Query('size') size = 10
    ): Promise<Pageable<Reservation>> {
        return this.reservationService.getUpcomingReservations(restaurantId, {
            page,
            size,
            sort: Sort.of('date,asc'),
        })
    }
}
