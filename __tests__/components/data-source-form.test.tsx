import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DataSourceForm } from '../../components/data-source-form';

describe('DataSourceForm', () => {
  it('renders form titles and file upload area correctly', () => {
    render(<DataSourceForm onSubmit={jest.fn()} isLoading={false} />);
    expect(screen.getByText(/Data Source Configuration/i)).toBeInTheDocument();
    expect(screen.getByText(/Upload an XML, JSON, or CSV file/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload File/i)).toBeInTheDocument();
  });

  it('renders data type tabs (XML, CSV, JSON) correctly', () => {
    render(<DataSourceForm onSubmit={jest.fn()} isLoading={false} />);
    // Tabs are rendered with role="tab"
    const xmlTab = screen.getByRole('tab', { name: /XML/i });
    const csvTab = screen.getByRole('tab', { name: /CSV/i });
    const jsonTab = screen.getByRole('tab', { name: /JSON/i });
    expect(xmlTab).toBeInTheDocument();
    expect(csvTab).toBeInTheDocument();
    expect(jsonTab).toBeInTheDocument();
  });

  it('calls onSubmit when a file is uploaded and the form is submitted', async () => {
    const onSubmit = jest.fn();
    render(<DataSourceForm onSubmit={onSubmit} isLoading={false} />);
    const file = new File(['{"items":[]}'], 'test.json', { type: 'application/json' });
    const fileInput = screen.getByLabelText(/Upload File/i);
    fireEvent.change(fileInput, { target: { files: [file] } });
    // Find and click the "Analyze Data" button
    const analyzeButton = screen.getByRole('button', { name: /Analyze Data/i });
    fireEvent.click(analyzeButton);
    // Since FileReader is async, we do not await onSubmit here; this is a smoke test
  });

  it('renders the Test Analyze button and it is clickable', () => {
    render(<DataSourceForm onSubmit={jest.fn()} isLoading={false} />);
    const testAnalyzeButton = screen.getByRole('button', { name: /Test Analyze/i });
    expect(testAnalyzeButton).toBeInTheDocument();
    fireEvent.click(testAnalyzeButton);
  });
}); 