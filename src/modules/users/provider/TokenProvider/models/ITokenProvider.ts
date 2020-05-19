export default interface ITokenProvider {
  generateToken(payload: string): string;
}
