import { setupServer } from 'msw/node';
import { rest } from 'msw';

// Mock API handlers
export const handlers = [
  // Create estimate
  rest.post('http://localhost:5000/api/estimates', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        _id: '123',
        ...req.body,
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
        createdAt: new Date().toISOString()
      })
    );
  }),

  // Get pricing
  rest.get('http://localhost:5000/api/pricing/:zipCode', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        zipCode: req.params.zipCode,
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
      })
    );
  }),

  // Initialize pricing
  rest.post('http://localhost:5000/api/pricing/init', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'Mock pricing data initialized successfully' })
    );
  })
];

export const server = setupServer(...handlers); 