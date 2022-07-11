import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'password'
})
export class PasswordPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return "•".repeat(value.length);
  }

}
