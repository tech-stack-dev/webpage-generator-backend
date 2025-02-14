import { IsString } from 'class-validator';

export class SaveToWebflowDto {
  @IsString()
  name: string;
}
