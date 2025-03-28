import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

@Injectable()
export class KeycloakAuthGuard implements CanActivate {
  private client = jwksClient({
    jwksUri:
      'https://<YOUR_KEYCLOAK_DOMAIN>/realms/<YOUR_REALM>/protocol/openid-connect/certs',
  });

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No Bearer token found');
    }

    const token = authHeader.split(' ')[1];

    try {
      (request as any).user = await this.verifyToken(token);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
    this.client.getSigningKey(header.kid, (err, key) => {
      if (err || !key) {
        callback(new Error('Unable to get signing key'));
        return;
      }
      const signingKey = key.getPublicKey();
      callback(null, signingKey);
    });
  }

  private async verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        this.getKey.bind(this),
        { algorithms: ['RS256'] },
        (err, decoded) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        },
      );
    });
  }
}
