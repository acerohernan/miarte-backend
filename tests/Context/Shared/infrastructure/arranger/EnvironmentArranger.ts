export interface EnvironmentArranger {
  arrange(): Promise<void>;
  close(): Promise<void>;
}
