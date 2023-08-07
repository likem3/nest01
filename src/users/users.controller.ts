import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly UserService: UsersService) {}

    @Get()
    getUsers(@Query('status') status: 'active'| 'nonactive') {
        return this.UserService.getUsers(status)
    }

    @Get(':id')
    getSingleUser(@Param('id') id: number) {
        return this.UserService.getUserDetail(id)
    }

    @Post('')
    createUser(@Body() test: string) {
        return {}
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
