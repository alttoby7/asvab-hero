import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const NAVY = "#0a1628";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: NAVY },
          headerTintColor: "#ffffff",
          contentStyle: { backgroundColor: NAVY },
          headerTitleStyle: { fontWeight: "700" },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
