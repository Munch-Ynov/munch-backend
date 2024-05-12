import { Controller, Logger, UseGuards } from '@nestjs/common'
import {
    Body,
    Get,
    Post,
    Patch,
    Delete,
    Param,
} from '@nestjs/common/decorators/http'
// biome-ignore lint/style/useImportType: <explanation>
import { ReservationService } from './reservation.service'
import {
    ExternalReservationCreateDto,
    ReservationCreateDto,
} from 'src/data/dto/reservation/reservation-create.dto'
import type { ReservationStatus } from 'src/data/models'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { ReservationUpdateDto } from 'src/data/dto/reservation/reservation-update.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { RolesGuard } from 'src/auth/roles.guard'

@Controller('reservation')
@ApiTags('reservation','API')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) { }

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
        Logger.log('Creating reservation', reservation)
        // log the type of reservation
        Logger.log('Type of reservation', typeof reservation)

        return this.reservationService.createReservation(reservation)
    }

    /**
     * Create a new External reservation
     */
    @Post('external')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiBody({ type: ExternalReservationCreateDto })
    async createExternalReservation(
        @Body() reservation: ExternalReservationCreateDto
    ) {
        return this.reservationService.createExternalReservation(reservation)
    }

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
}
