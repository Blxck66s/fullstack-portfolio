import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class LocalRegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 64)
  @Matches(/^[a-zA-Z0-9!@#$%^&*]+$/, {
    message: 'Password can only contain alphanumeric and special characters',
  })
  @Matches(/^(?=.*[A-Z])/, {
    message: 'Password must contain uppercase letter',
  })
  @Matches(/^(?=.*[a-z])/, {
    message: 'Password must contain lowercase letter',
  })
  @Matches(/^(?=.*[0-9])/, {
    message: 'Password must contain number',
  })
  @Matches(/^(?=.*[!@#$%^&*])/, {
    message: 'Password must contain special character',
  })
  @Matches(/^(?!.*\s)/, {
    message: 'Password must not contain spaces',
  })
  password: string;
}
