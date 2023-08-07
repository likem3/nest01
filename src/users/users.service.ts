import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {id: 1, name: "alex", status: 'active'},
        {id: 2, name: "alex11", status: 'nonactive'},
    ]

    getUsers(status: 'active' | 'nonactive') {
        if (status) {
            return this.users.filter((user) => user.status === status)
        }

        return this.users
    }

    getUserDetail(id: number) {
        const user = this.users.filter((user) => user.id == id)
        if (user.length >= 1 ) {
            console.log('hererere')
            return user[0]
        } else {
            return {}
        }
    }
}
