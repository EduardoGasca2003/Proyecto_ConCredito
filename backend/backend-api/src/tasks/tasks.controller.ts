import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  async createTask(@Body() body, @Req() req) {
    return this.tasksService.createTask(body.titulo, body.descripcion, req.user.id);
  }

  @Get()
  async getTasks(@Req() req) {
    return this.tasksService.getTasksByUser(req.user.id);
  }

  @Patch(':id')
  async updateTask(@Param('id') id: number, @Body() body) {
  return this.tasksService.updateTask(id, body.titulo, body.descripcion, body.completada);
}

  @Delete(':id')
  async deleteTask(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }
}
