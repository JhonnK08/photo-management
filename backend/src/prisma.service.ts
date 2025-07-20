import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, User } from '@photo-management/prisma';

export type { User };

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
