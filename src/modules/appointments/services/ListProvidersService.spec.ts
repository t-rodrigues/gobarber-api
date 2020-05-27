// import AppError from '@shared/error/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to show list all providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@jane.com',
      password: '111',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@jane.com',
      password: '111',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Family Doe',
      email: 'family@jane.com',
      password: '111',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
