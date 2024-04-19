import { Packaging } from "../../models/database/packaging";
import { PackagingTypeToLabelPipe } from "./packaging-type-to-label.pipe";

describe('PackagingTypeToLabelPipe', () => {
    let pipe = new PackagingTypeToLabelPipe();
    let packagings: Packaging[];

    beforeEach(() => {
        packagings = [new Packaging('123', 'Box'), new Packaging('345', 'Pallet'), new Packaging('ABC', 'Envelope')];
    });


    it('should correctly map types to labels', () => {
        for (let index = 0; index < packagings.length; index++) {
            expect(pipe.transform(packagings[index].code, packagings)).toBe(packagings[index].label);
        }
    });

    it('should fail to map type to label', () => {
        expect(pipe.transform('fake', packagings)).toBeUndefined();
    });

});