import IUserToken from '../infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
  generateToken(user_id: string): Promise<IUserToken>;
  findByToken(token: string): Promise<IUserToken | undefined>;
}
