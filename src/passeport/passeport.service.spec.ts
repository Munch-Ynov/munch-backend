import { Test, TestingModule } from '@nestjs/testing';
import { PasseportService } from './passeport.service';

describe('PasseportService', () => {
  let service: PasseportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasseportService],
    }).compile();

    service = module.get<PasseportService>(PasseportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
