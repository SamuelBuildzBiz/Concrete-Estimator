export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDimensions = (length, width, thickness) => {
  return `${length}' × ${width}' × ${thickness}"`;
};

export const formatProjectType = (type) => {
  return type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1');
};

export const formatSurfaceFinish = (finish) => {
  return finish.charAt(0).toUpperCase() + finish.slice(1).replace(/([A-Z])/g, ' $1');
}; 