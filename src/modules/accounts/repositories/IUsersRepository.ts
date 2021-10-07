import { ICreateUserDTO } from '../dto/ICreateUserDTO';
import { User } from '../entities/User';

interface IUsersRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  list(): Promise<User[]>;
  create(data: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
