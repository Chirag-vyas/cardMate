import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: [
          styles.tabBar,
          Platform.select({
            ios: {
              position: 'absolute',
            },
          }),
        ],
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />, 
        }}
      />
      <Tabs.Screen
        name="scannerPage"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View style={styles.scanButtonWrapper}>
              <View style={styles.scanButton}>
                <IconSymbol size={60} name="qrcode" color={color} />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: 'My Cards',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="creditcard.fill" color={color} />, 
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.85)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
  },
  scanButtonWrapper: {
    position: 'absolute',
    top: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButton: {
    width: 60,
    height: 60,
    borderRadius: 20,
  
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
