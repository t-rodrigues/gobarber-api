import ITokenProvider from '../models/ITokenProvider';

class FakeTokenProvider implements ITokenProvider {
  public generateToken(payload: string): string {
    return `${payload}_token`;
  }
}

export default FakeTokenProvider;
