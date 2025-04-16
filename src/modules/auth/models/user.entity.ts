import { Entity, Property, PrimaryKey, Enum } from '@mikro-orm/core';
import { v4 } from 'uuid';

export enum UserRole {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  USER = 'user',
}

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey()
  id: string = v4();

  @Property()
  phoneNumber: string;

  @Property({ hidden: true })
  password: string;

  @Enum(() => UserRole)
  role: UserRole;

  @Property({ defaultRaw: 'CURRENT_TIMESTAMP' })
  createdAt: Date = new Date();

  @Property({ defaultRaw: 'CURRENT_TIMESTAMP', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ nullable: true })
  lastLoginAt?: Date;
}
