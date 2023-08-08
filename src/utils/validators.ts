import { InjectRepository } from "@nestjs/typeorm";
import { ValidationArguments, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { User } from "src/users/users.entity";
import { Repository } from "typeorm";

export class UniqueValidator implements ValidatorConstraintInterface{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const existingUser = await this.userRepository.findOne({
            where: {[relatedPropertyName]: value},
        })
        console.log(existingUser)
        return !existingUser
    }

    defaultMessage(args: ValidationArguments): string {
        const[relatedPropertyName] = args.constraints
        return `${relatedPropertyName} must be unique.`
    }
}

export function IsUnique(property: string) {
    return (object: Record<string, any>, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: {message: `${propertyName} must be unique.`},
            constraints: [property],
            validator: UniqueValidator,
        })
    }
}