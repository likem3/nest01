import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/users.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}
    
    async create(createUserDto: UserCreateDto): Promise<User> {

        const saltRounds: number = 10
        const password: string = createUserDto.password
        const passwordHash: string = await bcrypt.hash(password, saltRounds)

        const user = new User()

        user.username = createUserDto.username
        user.email = createUserDto.email
        user.password = passwordHash
        user.first_name = createUserDto.first_name
        user.last_name = createUserDto.last_name

        return this.userRepository.save(user)

    }

    findAll(): Promise<User[]> {
        return this.userRepository.find()
    }

    findOne(id: number): Promise<User | null> {
        return this.userRepository.findOneBy({id})
    }

    findOneByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOneBy({email})
    }

    async delete(id: number): Promise<void> {
        const deleteResponse = await this.userRepository.softDelete(id)
        if(!deleteResponse.affected) throw new HttpException('Invalid id', HttpStatus.NOT_FOUND)
        else throw new HttpException('deleted', HttpStatus.NO_CONTENT)
        
    }

    async auth(email: string, password: string): Promise<User|null> {
        const user = await this.userRepository.findOneBy({email})

        if(!user) return null

        const isMatch: boolean = await bcrypt.compare(password, user.password)

        if (!isMatch) return null
        return user
    }
}
