export interface IKafkaMessage<T> {
  key: Buffer | null;
  value: T;
  timestamp: string;
  attributes: number;
  offset: string;
  size: number;
  headers?: never;
}
