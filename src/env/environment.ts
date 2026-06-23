import * as Joi from 'joi';
import { ConfigService } from '@nestjs/config';

abstract class ENV_KEYS {
  // @ts-ignore
  static PORT: number = Joi.number().required();
  // @ts-ignore
  static NODE_ENV: string = Joi.string()
    .valid('development', 'production', 'test', 'localhost')
    .required();
}

export class Environment extends ENV_KEYS {
  public constructor(configService: ConfigService) {
    super();
    const missingEnvs: string[] = [];
    for (const envKey of Object.keys(ENV_KEYS)) {
      const value = configService.get<string>(envKey);
      if (value === undefined) {
        missingEnvs.push(envKey);
        continue;
      }
      if (Joi.isSchema(Environment[envKey])) {
        const result = Environment[envKey].validate(value);
        if (result.error) {
          missingEnvs.push(`${envKey}: ${result.error.message}`);
          continue;
        }
      }
      Environment[envKey] = value;
    }
    if (missingEnvs.length > 0) {
      throw new Error(
        `Missing or invalid environment variables:\n${missingEnvs.join('\n')}`,
      );
    }
  }
}
