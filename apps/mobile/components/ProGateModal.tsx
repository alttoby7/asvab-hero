import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@asvab-hero/ui-tokens/colors";
import { fontSize, fontWeight } from "@asvab-hero/ui-tokens/typography";
import { spacing, radius } from "@asvab-hero/ui-tokens/spacing";
import type { GateReason } from "../lib/pro-gate";
import { gateMessage } from "../lib/pro-gate";

interface Props {
  visible: boolean;
  reason: GateReason;
  onClose: () => void;
}

export default function ProGateModal({ visible, reason, onClose }: Props) {
  const router = useRouter();
  const { title, body } = gateMessage(reason);

  function openPaywall() {
    onClose();
    router.push({ pathname: "/paywall", params: { reason } });
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <Ionicons
            name="lock-closed"
            size={40}
            color={colors.accent}
            style={styles.icon}
          />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>{body}</Text>

          <Pressable style={styles.upgradeButton} onPress={openPaywall}>
            <Text style={styles.upgradeText}>Upgrade to Pro</Text>
          </Pressable>

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Not now</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    backgroundColor: colors.navyCard,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing[6],
    paddingBottom: spacing[10],
    alignItems: "center",
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.navyBorder,
    borderRadius: 2,
    marginBottom: spacing[6],
  },
  icon: {
    marginBottom: spacing[4],
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.extrabold,
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: spacing[2],
  },
  body: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: fontSize.base * 1.5,
    marginBottom: spacing[6],
  },
  upgradeButton: {
    width: "100%",
    paddingVertical: spacing[4],
    backgroundColor: colors.accent,
    borderRadius: radius.lg,
    alignItems: "center",
    marginBottom: spacing[3],
  },
  upgradeText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.navy,
  },
  closeButton: {
    paddingVertical: spacing[3],
  },
  closeText: {
    fontSize: fontSize.base,
    color: colors.textMuted,
  },
});
