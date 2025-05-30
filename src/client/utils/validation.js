export const validateEstimateForm = (values) => {
  const errors = {};

  // Dimensions validation
  if (!values.dimensions.length || values.dimensions.length <= 0) {
    errors['dimensions.length'] = 'Length is required and must be greater than 0';
  }
  if (!values.dimensions.width || values.dimensions.width <= 0) {
    errors['dimensions.width'] = 'Width is required and must be greater than 0';
  }
  if (!values.dimensions.thickness || values.dimensions.thickness <= 0) {
    errors['dimensions.thickness'] = 'Thickness is required and must be greater than 0';
  }

  // Zip code validation
  if (!values.zipCode) {
    errors.zipCode = 'Zip code is required';
  } else if (!/^\d{5}(-\d{4})?$/.test(values.zipCode)) {
    errors.zipCode = 'Invalid zip code format';
  }

  // Contact info validation for sales reps
  if (values.userType === 'salesRep') {
    if (!values.contactInfo.name) {
      errors['contactInfo.name'] = 'Name is required';
    }
    if (!values.contactInfo.email) {
      errors['contactInfo.email'] = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.contactInfo.email)) {
      errors['contactInfo.email'] = 'Invalid email format';
    }
    if (!values.contactInfo.phone) {
      errors['contactInfo.phone'] = 'Phone number is required';
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(values.contactInfo.phone)) {
      errors['contactInfo.phone'] = 'Invalid phone number format';
    }
  }

  return errors;
}; 