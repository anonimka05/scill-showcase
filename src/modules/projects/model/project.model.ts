import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Category } from '@modules';
import { User } from '@modules';

@Table({ tableName: 'projects', timestamps: true })
export class Project extends Model {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.BIGINT,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}
