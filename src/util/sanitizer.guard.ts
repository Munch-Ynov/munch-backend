import {
    Injectable,
    type CanActivate,
    type ExecutionContext,
} from '@nestjs/common'
import * as xss from 'xss'

@Injectable()
export class SanitizerGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()

        if (request.body) {
            this.sanitizeData(request.body)
        }

        return true
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    private sanitizeData(data: Record<string, any>): void {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                if (typeof data[key] === 'string') {
                    data[key] = xss.filterXSS(data[key])
                } else if (typeof data[key] === 'object') {
                    this.sanitizeData(data[key])
                }
            }
        }
    }
}
