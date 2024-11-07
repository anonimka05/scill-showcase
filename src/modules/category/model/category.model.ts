import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Project } from '@modules';

@Table({ tableName: 'categories', timestamps: true })
export class Category extends Model {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @HasMany(() => Project)
  projects: Project[];
}
