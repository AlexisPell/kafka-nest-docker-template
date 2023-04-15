import { Injectable } from '@nestjs/common';

interface Config {
  NODE_ENV: string;
  PORTS: {
    API_GATEWAY_PORT: number;
    API_AUTH_PORT: number;
    API_USERS_PORT: number;
  };
  KAFKA_CLIENT_BROKER: string;
  POSTGRES: {
    HOST: string;
    PORT: number;
    USER: string;
    PASSWORD: string;
    DB: string;
  };
}

// As for now - its not a good practice to share set of all variables
// across multiple services, but for now i want single config source
// - let it be :)
@Injectable()
export class ConfigService {
  readonly config = {} as Config;

  constructor() {
    this.checkEnvVar(process.env.NODE_ENV, 'NODE_ENV');
    this.checkEnvVar(process.env.API_GATEWAY_PORT, 'API_GATEWAY_PORT');
    this.checkEnvVar(process.env.API_AUTH_PORT, 'API_AUTH_PORT');
    this.checkEnvVar(process.env.API_USERS_PORT, 'API_USERS_PORT');
    this.checkEnvVar(process.env.KAFKA_CLIENT_BROKER, 'KAFKA_CLIENT_BROKER');
    this.checkEnvVar(process.env.POSTGRES_HOST, 'POSTGRES_HOST');
    this.checkEnvVar(process.env.POSTGRES_PORT, 'POSTGRES_PORT');
    this.checkEnvVar(process.env.POSTGRES_USER, 'POSTGRES_USER');
    this.checkEnvVar(process.env.POSTGRES_PASSWORD, 'POSTGRES_PASSWORD');
    this.checkEnvVar(process.env.POSTGRES_DB, 'POSTGRES_DB');

    this.config = {
      NODE_ENV: process.env.NODE_ENV,
      PORTS: {
        API_GATEWAY_PORT: +process.env.API_GATEWAY_PORT,
        API_USERS_PORT: +process.env.API_USERS_PORT,
        API_AUTH_PORT: +process.env.API_AUTH_PORT,
      },
      KAFKA_CLIENT_BROKER: process.env.KAFKA_CLIENT_BROKER,
      POSTGRES: {
        HOST: process.env.POSTGRES_HOST,
        PORT: +process.env.POSTGRES_PORT,
        USER: process.env.POSTGRES_USER,
        PASSWORD: process.env.POSTGRES_PASSWORD,
        DB: process.env.POSTGRES_DB,
      },
    };
  }

  getConfig(): Config {
    return this.config as Config;
  }

  private checkEnvVar(envVarValue: any, envVarName) {
    if (!envVarValue) throw new Error(`${envVarName} is not provided`);
  }
}
