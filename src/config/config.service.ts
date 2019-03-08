import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';

/**
 * EnvConfig defines env configuration type.
 *
 * @export
 * @interface EnvConfig
 */
export interface EnvConfig {
  [key: string]: string;
}

/**
 * ConfigService is used for loading configurations from .env file according
 * to development enviorment.
 *
 * @export
 * @class ConfigService
 */
@Injectable()
export class ConfigService {
  /**
   * envConfig stores config values.
   *
   * @private
   * @type {EnvConfig}
   * @memberof ConfigService
   */
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  /**
   * validateInput ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   *
   * @private
   * @param {EnvConfig} envConfig
   * @returns {EnvConfig}
   * @memberof ConfigService
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      HOMEPAGE_URL: 'http://localhost:3000/',
      OAUTH_GOOGLE_CLIENT_ID: Joi.string().required(),
      OAUTH_GOOGLE_CLIENT_SECRET: Joi.string().required(),
      JWT_SECRET_KEY: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  /**
   * getOauthGoogleClientId is getter for OAUTH_GOOGLE_CLIENT_ID.
   *
   * @returns {string}
   * @memberof ConfigService
   */
  public getOauthGoogleClientId(): string {
    return this.envConfig.OAUTH_GOOGLE_CLIENT_ID;
  }

  /**
   * getOauthGoogleClientId is getter for google OAUTH_GOOGLE_CLIENT_ID.
   *
   * @returns {string}
   * @memberof ConfigService
   */
  public getOauthGoogleClientSecret(): string {
    return this.envConfig.OAUTH_GOOGLE_CLIENT_SECRET;
  }

  /**
   * getJWTSecretKey is getter for JWT_SECRET_KEY.
   *
   * @returns {string}
   * @memberof ConfigService
   */
  public getJWTSecretKey(): string {
    return this.envConfig.JWT_SECRET_KEY;
  }

  /**
   * getHomePageUrl is getter for HOMEPAGE_URL.
   *
   * @returns {string}
   * @memberof ConfigService
   */
  public getHomePageUrl(): string {
    return this.envConfig.HOMEPAGE_URL;
  }
}
