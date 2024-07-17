import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfigService {
  getDB(): string {
    return process.env.DB;
  }
  getHost(): string {
    return process.env.DB_HOST;
  }
  getPort(): string {
    return process.env.DB_PORT;
  }
  getUsernameL(): string {
    return process.env.DB_USERNAME;
  }
  getPassword(): string {
    return process.env.DB_PASSWORD;
  }
  getUrl(): string {
    return process.env.DB_URL;
  }
  getSecret(): string {
    return process.env.JWT_SECRET;
  }
}
