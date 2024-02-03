import type { ValidationOptions } from "class-validator";
import { registerDecorator } from "class-validator";

export function generateDecorator(
  validationFunction: (value: any) => boolean,
  name: string,
  message: string,
) {
  return (validationOptions?: ValidationOptions) =>
    // eslint-disable-next-line @typescript-eslint/ban-types
    (object: Object, propertyName: string) => {
      registerDecorator({
        name,
        target: object.constructor,
        propertyName,
        options: { message, ...validationOptions },
        validator: {
          validate(value: any): boolean {
            return validationFunction(value);
          },
        },
      });
    };
}
