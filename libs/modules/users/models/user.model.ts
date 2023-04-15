import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { ApiProperty } from '@nestjs/swagger';

export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  fullname: string;
  createdAt: Date;
  updatedAt: Date;
}
export type UserCreationAttrs = Optional<UserAttributes, 'id'>;

@Table({ tableName: 'users' })
export class UserModel
  extends Model<UserAttributes, UserCreationAttrs>
  implements UserAttributes
{
  @ApiProperty({ description: 'User ID' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ description: 'Email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ description: 'Password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ description: "User's full name" })
  @Column({ type: DataType.STRING, allowNull: false })
  fullname: string;

  @ApiProperty({ description: 'Timestamp' })
  @Column({ type: DataType.TIME })
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp' })
  @Column({ type: DataType.TIME })
  updatedAt: Date;
}
