import { createEstimate, getPricing, initializePricing } from './api';
import { server } from '../mocks/server';

// Enable API mocking before tests
beforeAll(() => server.listen());
// Reset any runtime request handlers we may add during the tests
afterEach(() => server.resetHandlers());
// Disable API mocking after the tests are done
afterAll(() => server.close());

describe('API Service', () => {
  describe('createEstimate', () => {
    const mockEstimateData = {
      userType: 'homeowner',
      projectType: 'driveway',
      dimensions: {
        length: 20,
        width: 10,
        thickness: 4
      },
      surfaceFinish: 'smooth',
      addOns: ['rebar'],
      zipCode: '12345'
    };

    it('creates an estimate successfully', async () => {
      const response = await createEstimate(mockEstimateData);

      expect(response).toEqual({
        _id: '123',
        ...mockEstimateData,
        estimate: {
          materials: 1000,
          labor: 500,
          addOns: 200,
          total: 1700,
          priceRange: {
            low: 1530,
            high: 1870
          }
        },
        createdAt: expect.any(String)
      });
    });

    it('handles API errors', async () => {
      // Mock API error
      server.use(
        server.use(
          rest.post('http://localhost:5000/api/estimates', (req, res, ctx) => {
            return res(ctx.status(500), ctx.json({ message: 'Server error' }));
          })
        )
      );

      await expect(createEstimate(mockEstimateData)).rejects.toThrow('Server error');
    });
  });

  describe('getPricing', () => {
    it('fetches pricing data successfully', async () => {
      const zipCode = '12345';
      const response = await getPricing(zipCode);

      expect(response).toEqual({
        zipCode: '12345',
        baseConcreteCost: 150,
        laborRates: {
          driveway: 8.50,
          patio: 7.50,
          athleticCourt: 9.50
        },
        surfaceFinishMultipliers: {
          smooth: 1.0,
          broom: 1.1,
          stamped: 1.5,
          exposedAggregate: 1.4
        },
        addOns: {
          rebar: 2.50,
          wireMesh: 1.75,
          basePrep: 3.00,
          demolition: 4.00,
          pump: 500
        }
      });
    });

    it('handles API errors', async () => {
      // Mock API error
      server.use(
        rest.get('http://localhost:5000/api/pricing/:zipCode', (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ message: 'Server error' }));
        })
      );

      await expect(getPricing('12345')).rejects.toThrow('Server error');
    });
  });

  describe('initializePricing', () => {
    it('initializes pricing data successfully', async () => {
      const response = await initializePricing();

      expect(response).toEqual({
        message: 'Mock pricing data initialized successfully'
      });
    });

    it('handles API errors', async () => {
      // Mock API error
      server.use(
        rest.post('http://localhost:5000/api/pricing/init', (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ message: 'Server error' }));
        })
      );

      await expect(initializePricing()).rejects.toThrow('Server error');
    });
  });
}); 