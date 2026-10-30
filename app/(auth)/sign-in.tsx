import React from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { SignInForm } from '@/components/auth/SignInForm';

export default function SignInScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bottomOffset={24}
      >
          {/* Purple wave hero */}
          <View style={{
            backgroundColor: '#4C3FC4',
            borderBottomLeftRadius: 36,
            borderBottomRightRadius: 36,
            paddingTop: 52,
            paddingBottom: 44,
            paddingHorizontal: 28,
            alignItems: 'center',
            gap: 12,
            overflow: 'hidden',
          }}>
            <View style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: 80, backgroundColor: 'rgba(255,255,255,0.08)' }} />
            <View style={{ position: 'absolute', bottom: -30, left: -30, width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(245,72,106,0.10)' }} />
            <Image
              source={require('@/assets/images/cakalearn_logo_dark.svg')}
              style={{ width: 130, height: 37 }}
              contentFit="contain"
            />
            <View style={{ alignItems: 'center', gap: 6, marginTop: 4 }}>
              <Text style={{ color: '#fff', fontSize: 28, fontWeight: '900', letterSpacing: -0.5 }}>Welcome back</Text>
              <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>Sign in to your account</Text>
            </View>
          </View>

          {/* White form section */}
          <View style={{ paddingHorizontal: 24, paddingTop: 36, paddingBottom: 40 }}>
            <SignInForm />
          </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
