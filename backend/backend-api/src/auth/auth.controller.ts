import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body) {
    const { nombre, correo, contra } = body;
    return this.authService.register(nombre, correo, contra);
  }

  @Post('login')
  async login(@Body() body) {
    const { correo, contra } = body;
    return this.authService.login(correo, contra);
  }

  @Get('validate-token')
  @UseGuards(AuthGuard('jwt'))
  async validateToken(@Req() req) {
    return { message: 'Token válido', user: req.user };
  }
}
