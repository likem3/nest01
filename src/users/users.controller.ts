import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/users.dto';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly UserService: UsersService) {}

    @Get()
    getUsers(@Query('status') status: 'active'| 'nonactive') {
        return this.UserService.findAll()
    }

    @Get(':id')
    getSingleUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.UserService.findOne(id)
    }

    // @UsePipes(ValidationPipe)
    @Post('')
    createUser(@Body() createUserDto: UserCreateDto): Promise<User> {
        return this.UserService.create(createUserDto)
    }

    @Put(':id')
    updateUser(@Param('id') id: string) {
        return {}
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return {}
    }
}
