import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { User } from './entities/user.entity';
import { AxiosResponse } from 'axios';
import { Album } from './entities/album.entity';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PlaceholderService {
  constructor(private readonly httpService: HttpService) {}

  async getAlbums(): Promise<Album[]> {
    const { data } = await firstValueFrom<AxiosResponse<Album[]>>(
      this.httpService.get('https://jsonplaceholder.typicode.com/users'),
    );

    return data;
  }

  async getAlbum(id: number): Promise<Album | undefined> {
    const { data } = await firstValueFrom<AxiosResponse<Album>>(
      this.httpService.get(`https://jsonplaceholder.typicode.com/albums/${id}`),
    );

    return data ?? undefined;
  }

  async getPhotos(): Promise<Photo[]> {
    const { data } = await firstValueFrom<AxiosResponse<Photo[]>>(
      this.httpService.get('https://jsonplaceholder.typicode.com/photos'),
    );

    return data;
  }

  async getPhoto(id: number): Promise<Photo[]> {
    const { data } = await firstValueFrom<AxiosResponse<Photo[]>>(
      this.httpService.get(`https://jsonplaceholder.typicode.com/photos/${id}`),
    );

    return data;
  }

  async getUsers(): Promise<User[]> {
    const { data } = await firstValueFrom<AxiosResponse<User[]>>(
      this.httpService.get('https://jsonplaceholder.typicode.com/users'),
    );

    return data;
  }

  async getUser(id: number) {
    const { data } = await firstValueFrom<AxiosResponse<User>>(
      this.httpService.get(`https://jsonplaceholder.typicode.com/users/${id}`),
    );
    return data ?? undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const users = await this.getUsers();

    return users.find((user) => user.username === username);
  }
}
