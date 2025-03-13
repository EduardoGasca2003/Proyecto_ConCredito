import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(nombre: string, correo: string, contra: string) {
    try {
        if (!nombre || !correo || !contra) {
            throw new Error("Todos los campos son obligatorios");
        }

        // Verificar si el correo ya está registrado
        const existingUser = await this.userRepository.findOne({ where: { correo } });
        if (existingUser) {
            throw new Error("Este correo ya está registrado. Intenta con otro.");
        }

        const hashedPassword = await bcrypt.hash(contra, 10);
        const newUser = this.userRepository.create({ nombre, correo, contra: hashedPassword });
        return this.userRepository.save(newUser);
    } catch (error) {
        throw new Error(`Error en el registro: ${error.message}`);
    }
}

  async login(correo: string, contra: string) {
    console.log("Datos recibidos en login:", correo, contra);
    
    const user = await this.userRepository.findOne({ 
      where: { correo },
      select: ["id", "nombre", "correo", "contra"] 
    });

    console.log("Usuario encontrado:", user); 
    if (!user) throw new Error("Usuario no encontrado");

    console.log("Contraseña en BD:", user.contra); 
    if (!user.contra) throw new Error("Contraseña no encontrada en la BD");

    const isPasswordValid = await bcrypt.compare(contra, user.contra);
    if (!isPasswordValid) throw new Error("Contraseña incorrecta");

    const token = jwt.sign({ id: user.id, correo: user.correo }, "clave_secreta", { expiresIn: "1h" });

    return { token, userName: user.nombre };
  }

}
