import AppError from '@shared/error/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../provider/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Thiago Rodrigues',
      email: 'thiagor_@live.com',
      password: '111',
      passwordConfirmation: '111',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create user with registered e-mail', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Thiago Rodrigues',
      email: 'thiagor_@live.com',
      password: '111',
      passwordConfirmation: '111',
    });

    expect(
      createUser.execute({
        name: 'Thiago Rodrigues',
        email: 'thiagor_@live.com',
        password: '111',
        passwordConfirmation: '111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create user without password confirmation', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      createUser.execute({
        name: 'Thiago Rodrigues',
        email: 'thiagor_@live.com',
        password: '111',
        passwordConfirmation: '1112',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
