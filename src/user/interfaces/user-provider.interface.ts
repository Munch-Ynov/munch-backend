
export abstract class UserProvider {
  abstract create(createUserDto: CreateUserDto): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findOne(id: number): Promise<User>;
  abstract update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
  abstract remove(id: number): Promise<User>;
}