namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    GATEWAY_PORT: number;
    // user service
    USER_GRPC_URL: string;
  }
}
