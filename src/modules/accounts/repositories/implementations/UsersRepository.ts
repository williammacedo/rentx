import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dto/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  findById(id: string): Promise<User> {
    return this.repository.findOne(id);
  }

  findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }

  list(): Promise<User[]> {
    return this.repository.find();
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({ ...data });

    await this.repository.save(user);
  }
}

export { UsersRepository };
