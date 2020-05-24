import AppError from '@shared/error/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../provider/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@jane.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generateToken(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      token,
      password: '111222',
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('111222');
    expect(generateHash).toHaveBeenCalledWith('111222');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generateToken(
      'non-existing-user',
    );

    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with expired token (2 hours)', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@jane.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generateToken(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        token,
        password: '111222',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
