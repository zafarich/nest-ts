import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, AuthResponseDto } from './models/auth.dto';
import { User, UserRole } from './models/user.entity';
import { EntityManager } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.em.findOne(User, { phoneNumber: loginDto.phoneNumber });
    
    if (!user) {
      throw new UnauthorizedException('Telefon raqam yoki parol noto\'g\'ri');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Telefon raqam yoki parol noto\'g\'ri');
    }

    // Login paytida lastLoginAt qiymatini yangilab qo'yamiz
    user.lastLoginAt = new Date();
    await this.em.persistAndFlush(user);

    const payload = { 
      sub: user.id,
      phoneNumber: user.phoneNumber,
      role: user.role 
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        phoneNumber: user.phoneNumber,
        role: user.role,
      }
    };
  }

  async createSuperAdmin(phoneNumber: string, password: string): Promise<User> {
    // Tekshiramiz, superadmin mavjud bo'lsa, qayta yaratmaymiz
    const existingSuperAdmin = await this.em.findOne(User, { role: UserRole.SUPERADMIN });
    
    if (existingSuperAdmin) {
      return existingSuperAdmin;
    }

    // Yangi superadmin yaratamiz
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const superAdmin = new User();
    superAdmin.phoneNumber = phoneNumber;
    superAdmin.password = hashedPassword;
    superAdmin.role = UserRole.SUPERADMIN;
    
    await this.em.persistAndFlush(superAdmin);
    
    return superAdmin;
  }
} 