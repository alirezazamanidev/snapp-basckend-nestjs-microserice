namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    GATEWAY_PORT: number;
    // user service
    USER_GRPC_URL: string;
    // OTP
    OTP_EXPIRATION_MINUTES: number;
    // DB
    MYSQL_HOST: string;
    MYSQL_PORT: number;
    MYSQL_USERNAME: string;
    MYSQL_PASSWORD: string;
    MYSQL_DATABASE: string;
    // Redis
    REDIS_URL: string;
  }
}
