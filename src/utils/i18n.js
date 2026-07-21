import { useLanguageStore } from '../stores/languageStore';

/**
 * Format currency based on the current language
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  const { language } = useLanguageStore.getState();
  
  if (language === 'en') {
    // For English context, maybe format as IDR still but with English locale
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // Default to Indonesian formatting
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
