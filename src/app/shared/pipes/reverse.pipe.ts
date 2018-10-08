import { Pipe, PipeTransform } from '@angular/core';
/*
 * Reverse the value of an array.
 * Usage:
 *   arr | reverse
 * Example:
 *   {{ arr | reverse }}
*/
@Pipe({ name: 'reverse' })
export class ReversePipe implements PipeTransform {
    transform(value: any[]): any[] {
        let re = value.reverse();
        console.log(re);
        return value;
    }
}