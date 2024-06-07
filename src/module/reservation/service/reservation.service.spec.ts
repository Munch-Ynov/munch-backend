import { ReservationServiceImpl } from "@/config/reservation/reservation.service.impl";
import { Filter, Pageable, PaginationRequest } from "@/data/util";
import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from "@nestjs/testing";
import { ReservationStatus } from "@prisma/client";
import { Reservation } from "../model/reservation.model";
import { ReservationRepository } from "../repository/reservation.repository";
import { ReservationService } from "./reservation.service";
import { ExternalReservationCreateDto, ReservationCreateDto } from "../dto/reservation-create.dto";
import { ParameterException } from "@/exception/parameter-exception";
import { NotFoundException } from "@nestjs/common";
import { UserRepository } from "@/module/user/repository/user.repository";
import { RestaurantRepository } from "@/module/restaurant/repository/restaurant.repository";


const $restaurants = [
  { id: "1" },
  { id: "2" }
]

const $users = [
  { id: "1" },
  { id: "2" }
]

// set date to 01012021
const $reservations: Array<Reservation> = [];


describe('ReservationService', () => {
  let service: ReservationService;

  beforeEach(async () => {
    // remove all reservations from the array
    $reservations.splice(0, $reservations.length)
    // add 4 reservations to the
    $reservations.push({
      id: "1",
      date: new Date("2021-01-01"),
      nb_people: 2,
      status: ReservationStatus.PENDING,
      userId: "1",
      restaurantId: "1",
      createdAt: new Date("2021-01-01"),
      updatedAt: new Date("2021-01-01")
    })
    $reservations.push({
      id: "2",
      date: new Date("2021-01-01"),
      nb_people: 2,
      status: ReservationStatus.ACCEPTED,
      userId: "1",
      restaurantId: "1",
      createdAt: new Date("2021-01-01"),
      updatedAt: new Date("2021-01-01")
    })
    $reservations.push({
      id: "3",
      date: new Date("2021-01-01"),
      nb_people: 2,
      status: ReservationStatus.REFUSED,
      userId: "1",
      restaurantId: "1",
      createdAt: new Date("2021-01-01"),
      updatedAt: new Date("2021-01-01")
    })
    $reservations.push({
      id: "4",
      date: new Date("2021-01-01"),
      nb_people: 2,
      status: ReservationStatus.PENDING,
      userId: "2",
      restaurantId: "1",
      createdAt: new Date("2021-01-01"),
      updatedAt: new Date("2021-01-01")
    })
    $reservations.push({
      id: "5",
      date: new Date("2021-01-01"),
      nb_people: 2,
      status: ReservationStatus.PENDING,
      userId: "1",
      restaurantId: "2",
      createdAt: new Date("2021-01-01"),
      updatedAt: new Date("2021-01-01")
    })


    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RestaurantRepository,
          useFactory: () => createMock<RestaurantRepository>({
            findOne: (id: string) => Promise.resolve($restaurants.find(r => r.id === id))
          }),
        },
        {
          provide: UserRepository,
          useFactory: () => createMock<UserRepository>({
            findOne: (id: string) => Promise.resolve($users.find(u => u.id === id))
          }),
        },
        {
          provide: ReservationRepository,
          useFactory: () => createMock<ReservationRepository>({
            findByUserId: (userId: string) => Promise.resolve($reservations.filter(r => r.userId === userId)),
            findMany: (args: {
              filter: Filter<Reservation>
              pageable: PaginationRequest<Reservation>
            }) => {
              const { filter, pageable } = args
              const reservations = $reservations.filter(r => {
                let valid = true
                for (const key in filter) {
                  if (filter[key].is !== r[key]) {
                    valid = false
                    break
                  }
                }
                return valid
              })
              return Promise.resolve(Pageable.fromArray(reservations, pageable));
            },
            createOne: (reservation: Reservation) => Promise.resolve({
              id: Math.random().toString(36),
              ...reservation,
              createdAt: new Date(),
              updatedAt: new Date()
            }),
            findOne: (id: string) => Promise.resolve($reservations.find(r => r.id === id)),
            updateOne: (id: string, reservation: Partial<Reservation>) => Promise.resolve({
              ...$reservations.find(r => r.id === id),
              ...reservation,
              updatedAt: new Date()
            }),
            deleteOne: (id: string) => {
              const reservation = $reservations.find(r => r.id === id)
              if (reservation) {
                $reservations.splice($reservations.indexOf(reservation), 1)
              }
              return Promise.resolve()
            }
          }),
        },
        {
          provide: ReservationService,
          useClass: ReservationServiceImpl,
        },
      ],
    }).compile()

    service = module.get<ReservationService>(ReservationService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // get reservation by id
  describe('getReservationById', () => {
    // with and existing id
    it('should return a reservation', async () => {
      const reservation = await service.getReservationById('1')
      expect(reservation).toEqual($reservations[0])
    })

    // with a non existing id
    it('should return null', async () => {
      const reservation = await service.getReservationById('10')
      expect(reservation).toBeNull()
    })
  })

  // get reservation by user id
  describe('getReservationByUserId', () => {
    // with an existing user id
    it('should return a list of reservations', async () => {
      const reservations = await service.getReservationByUserId('1', {
        pagination: Pageable.defaultRequest(),
        filter: {}
      })
      expect(reservations.content).toEqual($reservations.filter(r => r.userId === '1'))
      expect(reservations.totalElements).toBe(4)
      expect(reservations.totalPages).toBe(1)
    })
    // with an other existing user id
    it('should return a list of reservations', async () => {
      const reservations = await service.getReservationByUserId('2', {
        pagination: Pageable.defaultRequest(),
        filter: {}
      })
      expect(reservations.content).toEqual($reservations.filter(r => r.userId === '2'))
      expect(reservations.totalElements).toBe(1)
      expect(reservations.totalPages).toBe(1)
    })

    // with a non existing user id
    it('should return an empty list', async () => {
      const reservations = await service.getReservationByUserId('10', {
        pagination: Pageable.defaultRequest(),
        filter: {}
      })
      expect(reservations.content).toEqual([])
      expect(reservations.totalElements).toBe(0)
      expect(reservations.totalPages).toBe(0)
    })
  })

  // get reservation by restaurant id
  describe('getReservationByRestaurantId', () => {
    // with an existing restaurant id
    it('should return a list of reservations', async () => {
      const reservations = await service.getReservationByRestaurantId('1', {
        pagination: Pageable.defaultRequest(),
        filter: {}
      })
      expect(reservations.content).toEqual($reservations.filter(r => r.restaurantId === '1'))
      expect(reservations.totalElements).toBe(4)
      expect(reservations.totalPages).toBe(1)
    })

    // with an other existing restaurant id
    it('should return a list of reservations', async () => {
      const reservations = await service.getReservationByRestaurantId('2', {
        pagination: Pageable.defaultRequest(),
        filter: {}
      })
      expect(reservations.content).toEqual($reservations.filter(r => r.restaurantId === '2'))
      expect(reservations.totalElements).toBe(1)
      expect(reservations.totalPages).toBe(1)
    })

    // with a non existing restaurant id
    it('should return an empty list', async () => {
      const reservations = await service.getReservationByRestaurantId('10', {
        pagination: Pageable.defaultRequest(),
        filter: {}
      })
      expect(reservations.content).toEqual([])
      expect(reservations.totalElements).toBe(0)
      expect(reservations.totalPages).toBe(0)
    })
  })

  // create a reservation
  describe('createReservation', () => {
    // with a valid reservation
    it('should return the created reservation', async () => {
      const reservation = await service.createReservation(
        ReservationCreateDto.from({
          date: new Date("2021-01-01"),
          nb_people: 2,
          userId: "1",
          restaurantId: "1"
        })
      )
      expect(reservation).toEqual({
        id: expect.any(String),
        date: new Date("2021-01-01"),
        nb_people: 2,
        status: ReservationStatus.PENDING,
        userId: "1",
        restaurantId: "1",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      })
    })

    // with a non existing user id
    it('should throw a ParameterException', async () => {
      await expect(service.createReservation(
        ReservationCreateDto.from({
          date: new Date("2021-01-01"),
          nb_people: 2,
          userId: "10",
          restaurantId: "1"
        })
      )).rejects.toThrow(ParameterException)
    })

    // with a non existing restaurant id
    it('should throw a ParameterException', async () => {
      await expect(service.createReservation(
        ReservationCreateDto.from({
          date: new Date("2021-01-01"),
          nb_people: 2,
          userId: "1",
          restaurantId: "10"
        })
      )).rejects.toThrow(ParameterException)
    })
  })

  // create an external reservation
  describe('createExternalReservation', () => {
    // with a valid reservation
    it('should return the created reservation', async () => {
      const reservation = await service.createExternalReservation(
        ExternalReservationCreateDto.from({
          date: new Date("2021-01-01"),
          nb_people: 2,
          restaurantId: "1"
        })
      )
      //user id must be falsy
      expect(reservation.userId).toBeFalsy()
      expect(reservation).toEqual({
        id: expect.any(String),
        date: new Date("2021-01-01"),
        nb_people: 2,
        status: ReservationStatus.ACCEPTED,
        restaurantId: "1",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      })

    })

    // with a non existing restaurant id
    it('should throw a ParameterException', async () => {
      await expect(service.createExternalReservation(
        ExternalReservationCreateDto.from({
          date: new Date("2021-01-01"),
          nb_people: 2,
          restaurantId: "10"
        })
      )).rejects.toThrow(ParameterException)
    })
  })

  // update a reservation status
  describe('updateReservationStatus', () => {
    // with a valid reservation id
    it('should return the updated reservation', async () => {
      const reservation = await service.updateReservationStatus('1', ReservationStatus.ACCEPTED)
      expect(reservation).toEqual({
        id: "1",
        date: new Date("2021-01-01"),
        nb_people: 2,
        status: ReservationStatus.ACCEPTED,
        userId: "1",
        restaurantId: "1",
        createdAt: new Date("2021-01-01"),
        updatedAt: expect.any(Date)
      })
    })

    // with a non existing reservation id
    it('should throw an Error', async () => {
      await expect(service.updateReservationStatus('10', ReservationStatus.ACCEPTED)).rejects.toThrow(Error)
    })

    // with a non pending reservation
    it('should throw an Error', async () => {
      await expect(service.updateReservationStatus('2', ReservationStatus.ACCEPTED)).rejects.toThrow(Error)
    })
  })

  // update a reservation
  describe('updateReservation', () => {
    // with a valid reservation
    it('should return the updated reservation', async () => {
      const reservation = await service.updateReservation({
        id: '1',
        nb_people: 4
      })
      expect(reservation).toEqual({
        id: "1",
        date: new Date("2021-01-01"),
        nb_people: 4,
        status: ReservationStatus.PENDING,
        userId: "1",
        restaurantId: "1",
        createdAt: new Date("2021-01-01"),
        updatedAt: expect.any(Date)
      })
    })

    // with a non existing reservation id
    it('should throw an Error', async () => {
      await expect(service.updateReservation({
        id: '10',
        nb_people: 4
      })).rejects.toThrow(NotFoundException)
    })

    // with a non pending reservation
    it('should throw an Error', async () => {
      await expect(service.updateReservation({
        id: '2',
        nb_people: 4
      })).rejects.toThrow(ParameterException)
    })

    // to a non existing user id
    it('should throw a ParameterException', async () => {
      await expect(service.updateReservation({
        id: '1',
        userId: '10'
      })).rejects.toThrow(ParameterException)
    })

    // to a non existing restaurant id
    it('should throw a ParameterException', async () => {
      await expect(service.updateReservation({
        id: '1',
        restaurantId: '10'
      })).rejects.toThrow(ParameterException)
    })
  })

  // delete a reservation
  describe('deleteReservation', () => {
    // with a valid reservation id
    it('should return null', async () => {
      await service.deleteReservation('1')
      const reservation = await service.getReservationById('1')
      expect(reservation).toBeNull()
    })

    // with a non existing reservation id
    it('should throw a NotFoundException', async () => {
      await expect(service.deleteReservation('10')).rejects.toThrow(NotFoundException)
    })
  })


});
