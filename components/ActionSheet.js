import React, { useState } from 'react';
import {
    useWindowDimensions,
    TouchableOpacity,
    View,
    Button,
    Switch,
    Text
} from 'react-native';

import Animated, {
    useAnimatedGestureHandler,
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';

import { RadioButton } from 'react-native-paper';

import { PanGestureHandler } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { setApiData } from '../src/redux/reducers/apiDataReducer';

const SPRING_CONFIG = {
    damping: 30,
    overshootClamping: false,
    stiffness: 500,
    mass: 1,
}

const ActionSheet = () => {
    const dispatch = useDispatch();

    const { apiData } = useSelector((state) => state.apiData)

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [checked, setChecked] = useState('first');

    const dimensions = useWindowDimensions();

    const initialHeight = dimensions.height - 40;

    const sheetHeight = dimensions.height / 2;

    const maxHeight = sheetHeight - 20;

    const top = useSharedValue(initialHeight);

    const fadeAnim = useSharedValue(0);

    const style = useAnimatedStyle(() => {
        return {
            top: withSpring(top.value, SPRING_CONFIG)
        }
    })

    const actionStyle = useAnimatedStyle(() => {
        return {
            opacity: withSpring(fadeAnim.value, SPRING_CONFIG)
        }
    })

    const gestureHandler = useAnimatedGestureHandler({
        onStart(_, context) {
            context.startTop = top.value;
            context.fromInitial = top.value === initialHeight ? true : false;
        },
        onActive(event, context) {
            if (top.value >= maxHeight) {
                top.value = context.startTop + event.translationY;
            }

            //handle opacity
            if (top.value <= sheetHeight + ((sheetHeight / 2) - 120)) {
                fadeAnim.value = 1
            }
            else {
                fadeAnim.value = 0
            }
        },
        onEnd(_, context) {
            if (context.fromInitial) {
                if (top.value < initialHeight - 64) {
                    top.value = sheetHeight;
                    fadeAnim.value = 1;
                }
                else {
                    top.value = initialHeight
                    fadeAnim.value = 0;
                }
            }
            else {
                if (top.value > sheetHeight + 64) {
                    top.value = initialHeight;
                    fadeAnim.value = 0;
                }
                else {
                    top.value = sheetHeight
                    fadeAnim.value = 1;
                }
            }
        },
    });

    const pressHandler = () => {
        top.value = withSpring(
            top.value !== initialHeight ? initialHeight : dimensions.height / 2,
            SPRING_CONFIG
        )
        fadeAnim.value = withSpring(top.value > dimensions.height / 2 ? 1 : 0, SPRING_CONFIG)
    }

    const handlePress = () => {
        const dataProp = {
            first: 'amount',
            second: 'createdAt',
            third: 'updatedAt'
        }[checked]

        if (!isEnabled) {
            //ascending
            if (dataProp === 'amount') {
                apiData.sort((a, b) => a[dataProp] - b[dataProp])
                dispatch(setApiData(apiData))
            }
            else {
                apiData.sort((a, b) => {
                    return new Date(a[dataProp]).getTime() - new Date(b[dataProp]).getTime()
                })
                dispatch(setApiData(apiData))
            }
        }
        else {
            //descending
            if (dataProp === 'amount') {
                apiData.sort((a, b) => b[dataProp] - a[dataProp])
                dispatch(setApiData(apiData))
            }
            else {
                apiData.sort((a, b) => {
                    return new Date(b[dataProp]).getTime() - new Date(a[dataProp]).getTime()
                })
                dispatch(setApiData(apiData))
            }
        }
    }

    return (
        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[
                {
                    backgroundColor: 'white',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                }, style]}>
                <View style={{
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#bdbdbd',
                    height: 40,
                }}>
                    <TouchableOpacity
                        onPress={pressHandler}
                        style={{ margin: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 20, height: 15, width: 60 }}>
                        <View style={{ borderRadius: 20, height: 10, width: 50, backgroundColor: 'grey' }}></View>
                    </TouchableOpacity>
                </View>
                <Animated.View style={[{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }, actionStyle]}>

                    <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Ascending</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#c4c4c4" }}
                            thumbColor={isEnabled ? "#767577" : "#f4f3f4"}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                        <Text>Descending</Text>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="first"
                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('first')}
                                color='#767577'
                            />
                            <TouchableOpacity style={{ padding: 5 }} onPress={() => setChecked('first')}><Text>Amount</Text></TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="second"
                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('second')}
                                color='#767577'
                            />
                            <TouchableOpacity style={{ padding: 5 }} onPress={() => setChecked('second')}><Text>Created At</Text></TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="third"
                                status={checked === 'third' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('third')}
                                color='#767577'
                            />
                            <TouchableOpacity style={{ padding: 5 }} onPress={() => setChecked('third')}><Text>Updated At</Text></TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: dimensions.width - 200 }}>
                        <Button title="sort" onPress={handlePress} />
                    </View>
                </Animated.View>

            </Animated.View >
        </PanGestureHandler>
    );
}

export default ActionSheet;