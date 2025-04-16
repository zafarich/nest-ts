import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+998\d{9}$/, {
    message:
      "Telefon raqam +998 bilan boshlanib, 9 ta raqamdan iborat bo'lishi kerak",
  })
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 50, {
    message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
  })
  password: string;
}

export class AuthResponseDto {
  accessToken: string;
  user: {
    id: string;
    phoneNumber: string;
    role: string;
  };
}
