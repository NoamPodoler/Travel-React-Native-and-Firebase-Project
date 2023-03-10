import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  FadeIn,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { SCREEN_HEIGHT } from "../../../utils/constans";

type Props = {
  children: React.ReactNode;
  load: SharedValue<number>;
  style?: ViewStyle | ViewStyle[];
};

const FlexSection = ({ children, load, style = {} }: Props) => {
  const rStyleFlex = useAnimatedStyle(() => {
    const flex = load.value;
    const opacity = interpolate(load.value, [0.25, 1], [0, 1]);
    return {
      flex,
      opacity,
    };
  });

  return (
    <Animated.View style={[rStyleFlex, { overflow: "hidden" }]}>
      <View style={[style, { flex: 1 }]}>{children}</View>
    </Animated.View>
  );
};

export default FlexSection;

const styles = StyleSheet.create({});
