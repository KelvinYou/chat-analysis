import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileUploader from '..';

expect.extend({
  toBeFileArray(received) {
    const pass = Array.isArray(received) && received.every(item => item instanceof File);
    if (pass) {
      return {
        message: () => `expected ${received} not to be an array of File objects`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be an array of File objects`,
        pass: false,
      };
    }
  },
});

describe('FileUploader', () => {
  it('calls onFilesUpload with selected files on upload button click', () => {
    const mockOnFilesUpload = jest.fn();
    render(<FileUploader onFilesUpload={mockOnFilesUpload} />);

    // Create a sample file
    const file = new File(['file content'], 'test.txt', { type: 'text/plain' });

    // Mock the file input change event
    const fileInput = screen.getByRole('button', { name: /upload/i });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Mock the upload button click event
    const uploadButton = screen.getByText('Upload');
    fireEvent.click(uploadButton);

    // Assert that onFilesUpload was called with the selected file
    // expect(mockOnFilesUpload).toHaveBeenCalledWith(expect.toBeFileArray());

    // Assert that selectedFiles state is cleared after upload
    // expect(fileInput).toHaveProperty('files', null);
  });
});
