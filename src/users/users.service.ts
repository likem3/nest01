import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}
    
    create(createUserDto: UserCreateDto): Promise<User> {
        const user = new User()
        user.username = createUserDto.username
        user.email = createUserDto.email
        user.password = createUserDto.password
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
}
