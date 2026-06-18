import { Stack } from "expo-router";
import { colors } from "@asvab-hero/ui-tokens/colors";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.navy },
      }}
    />
  );
}
