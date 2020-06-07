import AppError from '@shared/error/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Thiago Rodrigues',
      email: 'thiagor_@live.com',
      password: '111',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create user with registered e-mail', async () => {
    await createUser.execute({
      name: 'Thiago Rodrigues',
      email: 'thiagor_@live.com',
      password: '111',
    });

    await expect(
      createUser.execute({
        name: 'Thiago Rodrigues',
        email: 'thiagor_@live.com',
        password: '111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
