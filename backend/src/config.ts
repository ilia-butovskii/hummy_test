export interface IDatabaseConfig {
  uri: string;
}

export interface IConfig {
  database: IDatabaseConfig;
  http: {
    cacheTtl: number;
  };
}

const config: IConfig = {
  database: {
    uri: 'mongodb://127.0.0.1:27017/hummy',
  },
  http: {
    cacheTtl: 60 * 60 * 24,
  },
};

export default config;
