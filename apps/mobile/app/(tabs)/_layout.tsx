import { Tabs } from "expo-router";
import { Text } from "react-native";

const NAVY = "#0a1628";
const ACCENT = "#3b82f6";
const MUTED = "#6b7280";

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text style={{ color: focused ? ACCENT : MUTED, fontSize: 20 }}>
      {label}
    </Text>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: NAVY, borderTopColor: "#1e293b" },
        tabBarActiveTintColor: ACCENT,
        tabBarInactiveTintColor: MUTED,
        headerStyle: { backgroundColor: NAVY },
        headerTintColor: "#ffffff",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon label="H" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="session"
        options={{
          title: "Study",
          tabBarIcon: ({ focused }) => (
            <TabIcon label="S" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: "Practice",
          tabBarIcon: ({ focused }) => (
            <TabIcon label="P" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: "Calc",
          tabBarIcon: ({ focused }) => (
            <TabIcon label="C" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon label="U" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
