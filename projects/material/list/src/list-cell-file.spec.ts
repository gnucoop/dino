import {ListCellIsDeletedFile, ListCellIsFile, isDeletedFile, isFileColumn} from './list-cell-file';

/**
 * A signature cleared by the user, as it comes back from the db: `content` and `size`
 * are set to undefined by ajf-signature and are dropped on serialization.
 */
const deletedSignature = {
  url: 'https://storage.example.com/v1/files/127e0e82-79c6-40d6-a10d-a1b104cb59d8',
  name: 'signature.png',
  type: 'image/png',
  deleteUrl: true,
  signature: true,
};

/**
 * An image deleted through the ajf file input, which keeps the emptied keys.
 */
const deletedImage = {
  type: 'image/png',
  url: 'https://storage.example.com/v1/files/127e0e82',
  content: null,
  name: null,
  size: 0,
  deleteUrl: true,
};

const validImage = {
  type: 'image/png',
  url: 'https://storage.example.com/v1/files/127e0e82',
  content: '',
  name: 'photo.png',
  size: 5000,
};

describe('list cell file', () => {
  const isFilePipe = new ListCellIsFile();
  const isDeletedPipe = new ListCellIsDeletedFile();

  it('should recognize a deleted signature as a file column', () => {
    expect(isFileColumn(deletedSignature)).toBe(true);
    expect(isFilePipe.transform(deletedSignature)).toBe(true);
  });

  it('should recognize a file deleted by the backend as a file column', () => {
    expect(isFileColumn({...deletedSignature, deleteUrl: false, isDeleted: true})).toBe(true);
    expect(isFileColumn({...deletedSignature, deleteUrl: false, deleted: true})).toBe(true);
  });

  it('should not treat a soft deleted non file value as a file column', () => {
    expect(isFileColumn({id: 'abc', label: 'foo', is_deleted: true, _deleted: true})).toBe(false);
    expect(isFilePipe.transform('a text value')).toBe(false);
  });

  it('should mark deleted signatures and images as deleted files', () => {
    expect(isDeletedFile(deletedSignature)).toBe(true);
    expect(isDeletedPipe.transform(deletedSignature)).toBe(true);
    expect(isDeletedPipe.transform(deletedImage)).toBe(true);
  });

  it('should not mark a valid file as deleted', () => {
    expect(isDeletedPipe.transform(validImage)).toBe(false);
    expect(isDeletedPipe.transform({...deletedSignature, size: 1234, deleteUrl: false})).toBe(
      false,
    );
  });
});
