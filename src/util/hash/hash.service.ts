import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
    constructor() {}

    private saltOrRounds = 10;
    
    async hashPassword(password: string): Promise<string> {
        // Hash password
        return bcrypt.hash(password, this.saltOrRounds);
    }
    
    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        // Compare password
        return bcrypt.compare(password, hashedPassword);
    }
}
