import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'cars' })
export class Car {
  @PrimaryGeneratedColumn('uuid')
	uuid?: string;

  @Column('varchar', {
    nullable: true,
  })
  vin: string;

  @Column('varchar', {
    nullable: true,
  })
  make: string;

  @Column('varchar', {
    nullable: true,
  })
  model: string;

  @Column('varchar', {
    nullable: true,
  })
  mileage: string;

  @Column('varchar', {
    nullable: true,
  })
  year: string;

  @Column('varchar', {
    nullable: true,
  })
  price: string;

  @Column('varchar', {
    name: 'zip_code',
    nullable: true,
  })
  zipCode: string;

  @Column('varchar', {
    nullable: true,
  })
  provider: string;

  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
  })
	createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'updated_at',
  })
	updatedAt: Date;
}