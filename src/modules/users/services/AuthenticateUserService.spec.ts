import AppError from '@shared/error/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeTokenProvider from '../providers/TokenProvider/fakes/FakeTokenProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeTokenProvider: FakeTokenProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeTokenProvider = new FakeTokenProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeTokenProvider,
    );
  });

  it('should be able to authenticate', async () => {
    await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@jane.com',
      password: '111',
    });

    const auth = await authenticateUser.execute({
      email: 'janedoe@jane.com',
      password: '111',
    });

    expect(auth).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'janedoe2@jane.com',
        password: '111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@jane.com',
      password: '111',
    });

    await expect(
      authenticateUser.execute({
        email: 'janedoe@jane.com',
        password: '1111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
