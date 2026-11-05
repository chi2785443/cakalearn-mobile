import { Stack, useNavigation } from 'expo-router';
import { useEffect } from 'react';
// SDK 56+ : expo-router is no longer compatible with @react-navigation,
// and re-exports the navigation primitives itself.
import { StackActions } from 'expo-router/build/react-navigation/routers/index';

export default function ClassroomStackLayout() {
  const navigation = useNavigation();

  useEffect(() => {
    const parent = navigation.getParent();
    // 'tabPress' is a bottom-tabs event; the parent here is typed generically
    // (expo-router's `useNavigation` has no way to narrow it to the tab navigator).
    const tabParent = parent as unknown as {
      addListener: (event: "tabPress", cb: (e: { target?: string }) => void) => (() => void) | undefined;
      getState: () => { routes: { name: string; key: string }[] } | undefined;
    } | undefined;
    return tabParent?.addListener("tabPress", (e) => {
      // Only reset when the features tab itself was pressed (not any other tab)
      const state = tabParent.getState();
      const featuresRoute = state?.routes.find((r) => r.name === "features");
      if (featuresRoute?.key === e.target && navigation.canGoBack()) {
        navigation.dispatch(StackActions.popToTop());
      }
    });
  }, [navigation]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="list" />
      <Stack.Screen name="[classroomId]/index" />
      <Stack.Screen name="[classroomId]/assessment/[assessmentId]" />
      <Stack.Screen
        name="[classroomId]/assessment/take"
        options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }}
      />
    </Stack>
  );
}
