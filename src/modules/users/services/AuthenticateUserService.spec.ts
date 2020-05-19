import AppError from '@shared/error/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../provider/HashProvider/fakes/FakeHashProvider';
import FakeTokenProvider from '../provider/TokenProvider/fakes/FakeTokenProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const fakeTokenProvider = new FakeTokenProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeTokenProvider,
    );

    await createUser.execute({
      name: 'Jane Doe',
      email: 'janedoe@jane.com',
      password: '111',
      passwordConfirmation: '111',
    });

    const auth = await authenticateUser.execute({
      email: 'janedoe@jane.com',
      password: '111',
    });

    expect(auth).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const fakeTokenProvider = new FakeTokenProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeTokenProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'janedoe2@jane.com',
        password: '111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const fakeTokenProvider = new FakeTokenProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeTokenProvider,
    );

    await createUser.execute({
      name: 'Jane Doe',
      email: 'janedoe@jane.com',
      password: '111',
      passwordConfirmation: '111',
    });

    expect(
      authenticateUser.execute({
        email: 'janedoe@jane.com',
        password: '1111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
