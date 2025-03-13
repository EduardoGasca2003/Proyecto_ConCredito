import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(titulo: string, descripcion: string, userId: number) {
    const newTask = this.taskRepository.create({ titulo, descripcion, completada: false, user: { id: userId } });
    return this.taskRepository.save(newTask);
  }

  async getTasksByUser(userId: number) {
    return this.taskRepository.find({ where: { user: { id: userId } },
      order: { id: "ASC" } });
  }

  async updateTask(id: number, titulo: string, descripcion: string, completada: boolean) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new Error("Tarea no encontrada");
  
    task.titulo = titulo || task.titulo;
    task.descripcion = descripcion || task.descripcion;
    task.completada = completada !== undefined ? completada : task.completada;
  
    return this.taskRepository.save(task);
  }

  async deleteTask(id: number) {
    await this.taskRepository.delete(id);
    return { message: 'Tarea eliminada' };
  }
}
