import { Module } from '@nestjs/common';
import { PlaceholderService } from './placeholder.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PlaceholderService],
  exports: [PlaceholderService],
})
export class PlaceholderModule {}
