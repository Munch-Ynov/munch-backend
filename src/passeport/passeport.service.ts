import { Injectable } from '@nestjs/common';
import { PasseportProvider, Payload } from './interface/passeport-provider.interface';
import {Auth} from "src/data/models/auth.model";

@Injectable()
export class PasseportService {
    constructor(private readonly passeportProvider: PasseportProvider,
    ) {
    }

    async createAccessToken(authUser: Auth) {
        return await this.passeportProvider.createAccessToken(authUser);
    }

    async createRefreshToken(authUser: Auth) {
        return await this.passeportProvider.createRefreshToken(authUser);
    }

    async validate(payload: Payload) {
        return await this.passeportProvider.validate(payload);
    }
}
