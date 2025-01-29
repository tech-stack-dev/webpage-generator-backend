import { Entity, PrimaryGeneratedColumn } from 'typeorm';

Entity({ name: 'generatedPages' });
export class GeneratedPage {
  @PrimaryGeneratedColumn()
  id: number;
}
