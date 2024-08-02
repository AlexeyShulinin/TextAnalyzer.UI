import { IBaseItem } from 'text-analyzer-ui-kit';

export enum INPUT_SOURCE {
    TEXT = 1,
    FILE = 2,
}

export const INPUT_SOURCE_OPTIONS: IBaseItem[] = [
    { id: INPUT_SOURCE.TEXT, name: 'Text' },
    { id: INPUT_SOURCE.FILE, name: 'File' },
];
