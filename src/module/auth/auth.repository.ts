import { Auth } from './model/auth.model'
import { Repository } from '../../data/repository/base.repository'

abstract class AuthRepository extends Repository<Auth> {
    abstract findByEmail(email: string): Promise<Auth>
}

export { AuthRepository }
