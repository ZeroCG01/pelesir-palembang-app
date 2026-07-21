import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}

// Functional component to use hooks like useTranslation
const ErrorFallback = ({ onReset }) => {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-dark-bg p-4">
      <Text className="text-primary text-6xl mb-4">⚠️</Text>
      <Text className="text-2xl font-montserrat-bold text-body dark:text-white mb-2 text-center">
        {t('common.error', 'Terjadi kesalahan')}
      </Text>
      <Text className="text-body-secondary dark:text-gray-400 text-center mb-8 font-montserrat">
        Maaf, aplikasi mengalami masalah yang tidak terduga.
      </Text>
      <TouchableOpacity 
        className="bg-primary px-8 py-3 rounded-button shadow-card"
        onPress={onReset}
      >
        <Text className="text-white font-montserrat-bold text-center">
          Coba Lagi
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorBoundary;
