import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

function IfError(substring: string, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'containsSubstring',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [substring],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }
          return value.includes(substring);
        },
      },
    });
  };
}

export default IfError;
