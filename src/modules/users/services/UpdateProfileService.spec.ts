import AppError from '@shared/error/AppError';

import FakeHashProvider from '../provider/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@jane.com',
      password: '111',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@john.com',
    });

    expect(updatedUser.name).toBe('John Doe');
    expect(updatedUser.email).toBe('johndoe@john.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@john.com',
      password: '111',
    });

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@jane.com',
      password: '111',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jane Doe',
        email: 'johndoe@john.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@jane.com',
      password: '111',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jane Doe',
      email: 'johndoe@john.com',
      old_password: '111',
      password: '123',
    });

    expect(updatedUser.password).toBe('123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@jane.com',
      password: '111',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jane Doe',
        email: 'johndoe@john.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@jane.com',
      password: '111',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jane Doe',
        email: 'johndoe@john.com',
        password: '123',
        old_password: 'wrong-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update non-user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-registered-user',
        name: 'John Doe',
        email: 'johndoe@john.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
