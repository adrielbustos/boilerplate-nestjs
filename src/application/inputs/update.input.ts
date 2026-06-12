export class UpdateInput<T> {
  public constructor(
    public readonly id: string,
    public readonly data: Partial<T>,
  ) {}
}
