import { validateEstimateForm } from './validation';

describe('validateEstimateForm', () => {
  const validFormData = {
    projectType: 'driveway',
    dimensions: {
      length: 20,
      width: 10,
      thickness: 4
    },
    surfaceFinish: 'smooth',
    zipCode: '12345'
  };

  it('returns no errors for valid form data', () => {
    const errors = validateEstimateForm(validFormData);
    expect(errors).toEqual({});
  });

  it('validates required fields', () => {
    const errors = validateEstimateForm({});
    expect(errors).toEqual({
      projectType: 'Project type is required',
      'dimensions.length': 'Length is required',
      'dimensions.width': 'Width is required',
      'dimensions.thickness': 'Thickness is required',
      surfaceFinish: 'Surface finish is required',
      zipCode: 'Zip code is required'
    });
  });

  it('validates dimensions are greater than 0', () => {
    const errors = validateEstimateForm({
      ...validFormData,
      dimensions: {
        length: 0,
        width: -5,
        thickness: 0
      }
    });

    expect(errors).toEqual({
      'dimensions.length': 'Length must be greater than 0',
      'dimensions.width': 'Width must be greater than 0',
      'dimensions.thickness': 'Thickness must be greater than 0'
    });
  });

  it('validates zip code format', () => {
    const invalidZipCodes = ['123', '123456', 'abcde', '1234-567'];
    invalidZipCodes.forEach(zipCode => {
      const errors = validateEstimateForm({
        ...validFormData,
        zipCode
      });
      expect(errors.zipCode).toBe('Invalid zip code format');
    });

    const validZipCodes = ['12345', '12345-6789'];
    validZipCodes.forEach(zipCode => {
      const errors = validateEstimateForm({
        ...validFormData,
        zipCode
      });
      expect(errors.zipCode).toBeUndefined();
    });
  });

  it('validates contact information for sales representatives', () => {
    const salesRepData = {
      ...validFormData,
      userType: 'salesRep',
      contactInfo: {
        name: '',
        email: 'invalid-email',
        phone: '123'
      }
    };

    const errors = validateEstimateForm(salesRepData);
    expect(errors).toEqual({
      'contactInfo.name': 'Name is required',
      'contactInfo.email': 'Invalid email format',
      'contactInfo.phone': 'Invalid phone number format'
    });
  });

  it('validates email format', () => {
    const invalidEmails = ['test', 'test@', 'test@test', '@test.com'];
    invalidEmails.forEach(email => {
      const errors = validateEstimateForm({
        ...validFormData,
        userType: 'salesRep',
        contactInfo: {
          name: 'Test User',
          email,
          phone: '123-456-7890'
        }
      });
      expect(errors['contactInfo.email']).toBe('Invalid email format');
    });

    const validEmails = ['test@test.com', 'test.user@domain.co.uk'];
    validEmails.forEach(email => {
      const errors = validateEstimateForm({
        ...validFormData,
        userType: 'salesRep',
        contactInfo: {
          name: 'Test User',
          email,
          phone: '123-456-7890'
        }
      });
      expect(errors['contactInfo.email']).toBeUndefined();
    });
  });

  it('validates phone number format', () => {
    const invalidPhones = ['123', '123-456', '123-456-789', 'abc-def-ghij'];
    invalidPhones.forEach(phone => {
      const errors = validateEstimateForm({
        ...validFormData,
        userType: 'salesRep',
        contactInfo: {
          name: 'Test User',
          email: 'test@test.com',
          phone
        }
      });
      expect(errors['contactInfo.phone']).toBe('Invalid phone number format');
    });

    const validPhones = ['123-456-7890', '(123) 456-7890', '123.456.7890'];
    validPhones.forEach(phone => {
      const errors = validateEstimateForm({
        ...validFormData,
        userType: 'salesRep',
        contactInfo: {
          name: 'Test User',
          email: 'test@test.com',
          phone
        }
      });
      expect(errors['contactInfo.phone']).toBeUndefined();
    });
  });
}); 