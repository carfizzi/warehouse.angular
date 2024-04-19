import { Pipe, type PipeTransform } from '@angular/core';
import { Packaging } from '../../models/database/packaging';

@Pipe({
  name: 'packagingTypeToLabel',
  standalone: true,
})
export class PackagingTypeToLabelPipe implements PipeTransform {

  transform(code: string, packagings: Packaging[]): string | undefined {
    return packagings.find(p => p.code === code)?.label;
  }

}
