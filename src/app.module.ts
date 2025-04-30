import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GeneratedPageModule } from './generated-page/generated-page.module';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GeneratedPageModule,
    OpenaiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
