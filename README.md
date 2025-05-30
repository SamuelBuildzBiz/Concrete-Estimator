# EZ Concrete Estimator

A full-stack web application for estimating residential concrete projects. Built with React, Node.js, Express, and MongoDB.

## Features

- User role selection (Homeowner/Sales Rep)
- Project type selection (Driveway, Patio, Athletic Court)
- Dimension input with automatic calculations
- Surface finish options
- Add-on selection
- Regional pricing based on zip code
- Detailed cost breakdown
- Price range estimation
- Lead capture for sales representatives
- Mobile-friendly design
- Form validation
- Error handling
- Loading states
- Responsive UI

## Tech Stack

### Frontend
- React
- Material-UI
- React Router
- Axios
- Custom Hooks
- Form Validation

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- Environment Variables

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/SamuelBuildzBiz/Concrete-Estimator.git
cd ez-concrete-estimator
```

2. Install server dependencies:
```bash
npm install
```

3. Install client dependencies:
```bash
npm run install-client
```

4. Create a `.env` file in the root directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/concrete-estimator
NODE_ENV=development
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

This will start both the backend server and the React development server.

- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## Project Structure

```
ez-concrete-estimator/
├── src/
│   ├── client/                 # React frontend
│   │   ├── components/        # React components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API services
│   │   ├── utils/            # Utility functions
│   │   └── App.js           # Main React component
│   └── server/               # Node.js backend
│       ├── controllers/      # Route controllers
│       ├── models/          # Database models
│       ├── routes/          # API routes
│       └── config/          # Configuration files
├── .env                     # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies
└── README.md              # Project documentation
```

## API Endpoints

### Estimates
- POST `/api/estimates` - Create new estimate
- GET `/api/estimates` - Get all estimates

### Pricing
- GET `/api/pricing/:zipCode` - Get pricing data for zip code
- POST `/api/pricing/init` - Initialize mock pricing data

## Development

### Code Style
- Use ESLint for code linting
- Follow the Airbnb JavaScript Style Guide
- Use Prettier for code formatting

### Git Workflow
1. Create a new branch for each feature
2. Write meaningful commit messages
3. Create pull requests for code review
4. Merge only after approval

## Deployment

### Heroku Deployment
1. Create a Heroku account
2. Install Heroku CLI
3. Login to Heroku
4. Create a new Heroku app
5. Add MongoDB add-on
6. Deploy using Git:
```bash
git push heroku main
```

### Environment Variables
Set the following environment variables in Heroku:
- `MONGODB_URI`
- `NODE_ENV`
- `PORT`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Future Enhancements

- User authentication and authorization
- Admin panel for managing pricing data
- PDF export functionality
- Email integration
- Project history tracking
- Advanced reporting features
- Mobile app development
- Integration with CRM systems
- Real-time pricing updates
- Customer feedback system 