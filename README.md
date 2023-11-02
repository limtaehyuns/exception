# Class validation with custom decorator

## Description
`class-validator`에서 사용되는 `@IsString()`과 같은 데코레이터에 Exception을 추가하여 사용할 수 있도록 Custom Decorator를 개발.

---

## Class-Validatior 에서 제공하는 message 사용하기
`class-validator`에서 제공하는 `message`를 사용하려면 `@IsString()`과 같은 데코레이터에 `message`를 추가해야 한다.
```typescript
@IsString({ message: 'name must be a string' })
name: string;
```
이런 방식으로 `message`를 사용하여 커스텀 메세지를 작성하고

`main.ts`에 있는 `exceptionFactory`를 사용하여
```typescript
exceptionFactory: (validationErrors: ValidationError[] = []) => {
  const messages = validationErrors
    .map((error) => `${Object.values(error.constraints).join(',')}`)
    .join(',');

  return new ValidationException(messages);
}
```
`ValidationErorr`의 constraints를 모아서 `ValidationException`을 발생시킨다.

하지만 이 방식은 `class-validator`에서 제공하는 `message`의 사용 취지와는 다르기 때문에 다른 방식을 채택하였다.

---

## ValidationPipe에서 지공하는 validatorPackage 사용하기
`ValidationPipe`에서 제공하는 `validatorPackage`를 사용하면 `class-validator`의 `validate`를 실행하기 전 다른 로직을 추가할 수 있다.
```typescript
validatorPackage: {
  validate: function (
    object: unknown,
    validatorOptions?: ValidatorOptions,
  ): ValidationError[] | Promise<ValidationError[]> {
    if (typeof object === 'object') {
      console.log(reflector.getMetadata);
      return validate(object, validatorOptions);
    }
    throw new Error('Function not implemented.');
  },
}
```
