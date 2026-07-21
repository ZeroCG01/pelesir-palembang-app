import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeArea } from '../src/components/layout/SafeArea';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <SafeArea className="flex-1 items-center justify-center p-5">
        <Text className="text-2xl font-montserrat-bold text-body dark:text-white mb-4 text-center">
          Halaman tidak ditemukan.
        </Text>
        <Link href="/" className="mt-4 p-4">
          <Text className="text-primary font-montserrat-bold text-base">
            Kembali ke layar utama
          </Text>
        </Link>
      </SafeArea>
    </>
  );
}
