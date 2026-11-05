import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import type { ZodSchema, ZodIssue } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema?: ZodSchema) {}

  transform(value: unknown) {
    if (!this.schema) {
      return value;
    }
    const result = this.schema.safeParse(value);
    if (!result.success) {
      const formattedErrors = result.error.errors.map((err: ZodIssue) => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      throw new BadRequestException({
        message: 'Validation failed',
        errors: formattedErrors,
      });
    }
    return result.data;
  }
}
