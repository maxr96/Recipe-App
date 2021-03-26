import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'duration' })
export class DurationPipe implements PipeTransform {
  transform(duration: string): string {
    return duration.replace('PT', '').replace('M', ' minutes');
  }
}
