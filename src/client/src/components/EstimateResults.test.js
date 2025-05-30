import React from 'react';
import { render, screen } from '@testing-library/react';
import EstimateResults from './EstimateResults';

describe('EstimateResults', () => {
  const mockEstimate = {
    projectType: 'driveway',
    dimensions: {
      length: 20,
      width: 10,
      thickness: 4
    },
    surfaceFinish: 'smooth',
    addOns: ['rebar', 'wireMesh'],
    estimate: {
      materials: 1000,
      labor: 500,
      addOns: 200,
      total: 1700,
      priceRange: {
        low: 1530,
        high: 1870
      }
    }
  };

  it('renders the estimate details correctly', () => {
    render(<EstimateResults estimate={mockEstimate} />);

    // Check project details
    expect(screen.getByText(/driveway/i)).toBeInTheDocument();
    expect(screen.getByText(/20' × 10' × 4"/i)).toBeInTheDocument();
    expect(screen.getByText(/smooth/i)).toBeInTheDocument();

    // Check add-ons
    expect(screen.getByText(/rebar/i)).toBeInTheDocument();
    expect(screen.getByText(/wire mesh/i)).toBeInTheDocument();

    // Check cost breakdown
    expect(screen.getByText(/\$1,000/i)).toBeInTheDocument(); // Materials
    expect(screen.getByText(/\$500/i)).toBeInTheDocument(); // Labor
    expect(screen.getByText(/\$200/i)).toBeInTheDocument(); // Add-ons
    expect(screen.getByText(/\$1,700/i)).toBeInTheDocument(); // Total

    // Check price range
    expect(screen.getByText(/\$1,530/i)).toBeInTheDocument(); // Low
    expect(screen.getByText(/\$1,870/i)).toBeInTheDocument(); // High
  });

  it('renders without add-ons when none are selected', () => {
    const estimateWithoutAddOns = {
      ...mockEstimate,
      addOns: [],
      estimate: {
        ...mockEstimate.estimate,
        addOns: 0,
        total: 1500,
        priceRange: {
          low: 1350,
          high: 1650
        }
      }
    };

    render(<EstimateResults estimate={estimateWithoutAddOns} />);

    // Check that add-ons section is not present
    expect(screen.queryByText(/add-ons/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/\$0/i)).not.toBeInTheDocument();

    // Check updated totals
    expect(screen.getByText(/\$1,500/i)).toBeInTheDocument(); // Total
    expect(screen.getByText(/\$1,350/i)).toBeInTheDocument(); // Low
    expect(screen.getByText(/\$1,650/i)).toBeInTheDocument(); // High
  });

  it('renders a message when no estimate is provided', () => {
    render(<EstimateResults estimate={null} />);
    expect(screen.getByText(/no estimate available/i)).toBeInTheDocument();
  });

  it('formats currency values correctly', () => {
    const estimateWithLargeNumbers = {
      ...mockEstimate,
      estimate: {
        materials: 1000000,
        labor: 500000,
        addOns: 200000,
        total: 1700000,
        priceRange: {
          low: 1530000,
          high: 1870000
        }
      }
    };

    render(<EstimateResults estimate={estimateWithLargeNumbers} />);

    // Check formatted currency values
    expect(screen.getByText(/\$1,000,000/i)).toBeInTheDocument(); // Materials
    expect(screen.getByText(/\$500,000/i)).toBeInTheDocument(); // Labor
    expect(screen.getByText(/\$200,000/i)).toBeInTheDocument(); // Add-ons
    expect(screen.getByText(/\$1,700,000/i)).toBeInTheDocument(); // Total
    expect(screen.getByText(/\$1,530,000/i)).toBeInTheDocument(); // Low
    expect(screen.getByText(/\$1,870,000/i)).toBeInTheDocument(); // High
  });
}); 