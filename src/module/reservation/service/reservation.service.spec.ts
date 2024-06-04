import { Test, TestingModule } from "@nestjs/testing";
import { ReservationServiceImpl } from "@/config/reservation/reservation.service.impl";
import { ReservationService } from "./reservation.service";
import { createMock } from '@golevelup/ts-jest';
import { ReservationRepository } from "../repository/reservation.repository";


describe('ReservationService', () => {
  let service: ReservationService;
  let mockReservationRepository: jest.Mocked<ReservationRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ReservationRepository,
          useFactory: () => createMock<ReservationRepository>({

          }),
        },
        {
          provide: ReservationService,
          useClass: ReservationServiceImpl,
        },
      ],
    }).compile()

    service = module.get<ReservationService>(ReservationService)
    mockReservationRepository = module.get(ReservationRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
});
