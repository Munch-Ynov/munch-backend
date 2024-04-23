import { Module } from '@nestjs/common';
import { PasseportService } from './passeport.service';
import { passeportProviderService } from 'src/config/passeportImplementation/passeport-provider.service';
import { PasseportProvider } from './interface/passeport-provider.interface';

@Module({
  // controllers: [PasseportController],
  providers: [PasseportService,{
    provide: PasseportProvider,
    useClass: passeportProviderService,
  }],
})
export class PasseportModule {}
