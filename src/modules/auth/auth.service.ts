import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: any): Promise<any> {
    const payload = { id: user.id, username: user.username, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
