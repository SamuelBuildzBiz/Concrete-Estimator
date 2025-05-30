import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EstimateForm from './EstimateForm';
import { server } from '../mocks/server';

// Enable API mocking before tests
beforeAll(() => server.listen());
// Reset any runtime request handlers we may add during the tests
afterEach(() => server.resetHandlers());
// Disable API mocking after the tests are done
afterAll(() => server.close());

describe('EstimateForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders the form with all required fields', () => {
    render(<EstimateForm onSubmit={mockOnSubmit} />);

    // Check for user type selection
    expect(screen.getByLabelText(/user type/i)).toBeInTheDocument();

    // Check for project type selection
    expect(screen.getByLabelText(/project type/i)).toBeInTheDocument();

    // Check for dimension inputs
    expect(screen.getByLabelText(/length/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/width/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/thickness/i)).toBeInTheDocument();

    // Check for surface finish selection
    expect(screen.getByLabelText(/surface finish/i)).toBeInTheDocument();

    // Check for add-ons section
    expect(screen.getByText(/add-ons/i)).toBeInTheDocument();

    // Check for zip code input
    expect(screen.getByLabelText(/zip code/i)).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByRole('button', { name: /get estimate/i })).toBeInTheDocument();
  });

  it('shows contact information fields when user type is sales rep', () => {
    render(<EstimateForm onSubmit={mockOnSubmit} />);

    // Select sales rep user type
    fireEvent.change(screen.getByLabelText(/user type/i), {
      target: { value: 'salesRep' }
    });

    // Check for contact information fields
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
  });

  it('validates required fields before submission', async () => {
    render(<EstimateForm onSubmit={mockOnSubmit} />);

    // Try to submit without filling required fields
    fireEvent.click(screen.getByRole('button', { name: /get estimate/i }));

    // Check for validation messages
    await waitFor(() => {
      expect(screen.getByText(/project type is required/i)).toBeInTheDocument();
      expect(screen.getByText(/length is required/i)).toBeInTheDocument();
      expect(screen.getByText(/width is required/i)).toBeInTheDocument();
      expect(screen.getByText(/thickness is required/i)).toBeInTheDocument();
      expect(screen.getByText(/surface finish is required/i)).toBeInTheDocument();
      expect(screen.getByText(/zip code is required/i)).toBeInTheDocument();
    });

    // Verify onSubmit was not called
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('submits the form with valid data', async () => {
    render(<EstimateForm onSubmit={mockOnSubmit} />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/project type/i), {
      target: { value: 'driveway' }
    });
    fireEvent.change(screen.getByLabelText(/length/i), {
      target: { value: '20' }
    });
    fireEvent.change(screen.getByLabelText(/width/i), {
      target: { value: '10' }
    });
    fireEvent.change(screen.getByLabelText(/thickness/i), {
      target: { value: '4' }
    });
    fireEvent.change(screen.getByLabelText(/surface finish/i), {
      target: { value: 'smooth' }
    });
    fireEvent.change(screen.getByLabelText(/zip code/i), {
      target: { value: '12345' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /get estimate/i }));

    // Verify onSubmit was called with correct data
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        userType: 'homeowner',
        projectType: 'driveway',
        dimensions: {
          length: 20,
          width: 10,
          thickness: 4
        },
        surfaceFinish: 'smooth',
        addOns: [],
        zipCode: '12345'
      });
    });
  });

  it('handles API errors gracefully', async () => {
    // Mock API error
    server.use(
      rest.post('http://localhost:5000/api/estimates', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Server error' }));
      })
    );

    render(<EstimateForm onSubmit={mockOnSubmit} />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/project type/i), {
      target: { value: 'driveway' }
    });
    fireEvent.change(screen.getByLabelText(/length/i), {
      target: { value: '20' }
    });
    fireEvent.change(screen.getByLabelText(/width/i), {
      target: { value: '10' }
    });
    fireEvent.change(screen.getByLabelText(/thickness/i), {
      target: { value: '4' }
    });
    fireEvent.change(screen.getByLabelText(/surface finish/i), {
      target: { value: 'smooth' }
    });
    fireEvent.change(screen.getByLabelText(/zip code/i), {
      target: { value: '12345' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /get estimate/i }));

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/server error/i)).toBeInTheDocument();
    });
  });
}); 