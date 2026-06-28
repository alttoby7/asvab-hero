import { View, Pressable, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@asvab-hero/ui-tokens/colors";
import { fontSize, fontWeight } from "@asvab-hero/ui-tokens/typography";
import { spacing } from "@asvab-hero/ui-tokens/spacing";
import type { AsvabSubtest } from "@asvab-hero/domain/types";
import PracticeTestEngine from "../components/PracticeTestEngine";

export default function PracticeTestScreen() {
  const { variant, subtest } = useLocalSearchParams<{
    variant: string;
    subtest?: string;
  }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  if (!variant) {
    router.back();
    return null;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={28} color={colors.textPrimary} />
        </Pressable>
      </View>
      <PracticeTestEngine
        variantCode={variant}
        subtest={subtest as AsvabSubtest | undefined}
        onContinue={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
});
