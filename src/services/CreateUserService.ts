import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../error/AppError';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    passwordConfirmation,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({ email });

    if (checkUserExists) {
      throw new AppError('E-mail address already used.');
    }

    const checkIfSamePassword = password === passwordConfirmation;

    if (!checkIfSamePassword) {
      throw new AppError('Password does not match.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    delete user.password;

    return user;
  }
}

export default CreateUserService;
