import React ,{useRef, useEffect} from "react";

import { Animated, Easing, View} from "react-native";
import LottieView from "lottie-react-native";
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
const NotifScreen = () => {
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    return () => {
      animationProgress.current = new Animated.Value(0);
    };
  }, []);
  return (
   <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
     <AnimatedLottieView
    source={require('../assets/maintenance.json')}
    progress={animationProgress.current}
    style={{height: 700, width: 700, borderWidth:1}}
  />
    </View>
  );
};

export default NotifScreen;
