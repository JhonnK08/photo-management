import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService, User } from '../prisma.service';
import { Prisma } from '@photo-management/prisma';
import { PlaceholderService } from 'src/placeholder/placeholder.service';
import { User as PlaceholderUser } from 'src/placeholder/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly placeholder: PlaceholderService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const placeholderUser = await this.placeholder.getUserByEmail(
      createUserDto.email,
    );

    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: createUserDto.password,
        username: createUserDto.username,
        referralId: placeholderUser?.id,
      },
    });
  }

  async findAll(): Promise<User[]> {
    const placeholderUsers = await this.placeholder.getUsers();
    const databaseUsers = await this.prisma.user.findMany();

    const filteredPlaceholderUsers: User[] = [];

    for (const user of placeholderUsers) {
      if (
        !databaseUsers.some(
          (databaseUser) =>
            databaseUser.referralId && databaseUser.referralId === user.id,
        )
      ) {
        filteredPlaceholderUsers.push(this.mapPlaceholderUserToUser(user));
      }
    }

    return [...filteredPlaceholderUsers, ...databaseUsers];
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      const placeholderUser = await this.placeholder.getUserByEmail(email);

      return placeholderUser
        ? this.mapPlaceholderUserToUser(placeholderUser)
        : undefined;
    }

    return user;
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    try {
      await this.prisma.user.update({
        data: {
          email: updateUserDto.email,
          name: updateUserDto.name,
          password: updateUserDto.password,
        },
        where: {
          email: email,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025' || error.code === 'P2016') {
          throw new NotFoundException(`Can't find user with email ${email}`);
        }
      }

      throw error;
    }
  }

  async remove(email: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: {
          email: email,
        },
      });

      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025' || error.code === 'P2016') {
          throw new NotFoundException(`Can't find user with email ${email}`);
        }
      }

      throw error;
    }
  }

  mapPlaceholderUserToUser(placeholderUser: PlaceholderUser): User {
    return {
      email: placeholderUser.email,
      name: placeholderUser.name,
      referralId: placeholderUser.id,
      username: placeholderUser.username,
      id: 9999,
      password: '',
    };
  }
}
