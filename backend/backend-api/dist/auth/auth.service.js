"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity/user.entity");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let AuthService = class AuthService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async register(nombre, correo, contra) {
        try {
            if (!nombre || !correo || !contra) {
                throw new Error("Todos los campos son obligatorios");
            }
            const existingUser = await this.userRepository.findOne({ where: { correo } });
            if (existingUser) {
                throw new Error("Este correo ya está registrado. Intenta con otro.");
            }
            const hashedPassword = await bcrypt.hash(contra, 10);
            const newUser = this.userRepository.create({ nombre, correo, contra: hashedPassword });
            return this.userRepository.save(newUser);
        }
        catch (error) {
            throw new Error(`Error en el registro: ${error.message}`);
        }
    }
    async login(correo, contra) {
        console.log("Datos recibidos en login:", correo, contra);
        const user = await this.userRepository.findOne({
            where: { correo },
            select: ["id", "nombre", "correo", "contra"]
        });
        console.log("Usuario encontrado:", user);
        if (!user)
            throw new Error("Usuario no encontrado");
        console.log("Contraseña en BD:", user.contra);
        if (!user.contra)
            throw new Error("Contraseña no encontrada en la BD");
        const isPasswordValid = await bcrypt.compare(contra, user.contra);
        if (!isPasswordValid)
            throw new Error("Contraseña incorrecta");
        const token = jwt.sign({ id: user.id, correo: user.correo }, "clave_secreta", { expiresIn: "1h" });
        return { token, userName: user.nombre };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map