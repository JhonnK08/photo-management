import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService, User } from '../prisma.service';
import { Prisma } from '@photo-management/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: createUserDto.username,
        name: createUserDto.name,
        password: createUserDto.password,
        username: createUserDto.username,
      },
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    return user ?? undefined;
  }

  update(username: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      data: {
        email: updateUserDto.email,
        name: updateUserDto.name,
        password: updateUserDto.password,
      },
      where: {
        username: username,
      },
    });
  }

  async remove(username: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: {
          username: username,
        },
      });

      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025' || error.code === 'P2016') {
          throw new NotFoundException(
            `Can't find user with username ${username}`,
          );
        }
      }
      throw error;
    }
  }
}
