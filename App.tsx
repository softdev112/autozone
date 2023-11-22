import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import YearListView, { YearListViewProps } from './components/YearListView';
import MakeListView, { MakeListViewProps } from './components/MakeListView';
import ModelListView, { ModelListViewProps } from './components/ModelListView';

type RootStackParamList = {
  YearListView: YearListViewProps;
  MakeListView: MakeListViewProps;
  ModelListView: ModelListViewProps;
};

type NavigationProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
};

const Stack = createStackNavigator<RootStackParamList>();

const BackArrow = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={goBack}>
      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>Back</Text>
      </View>
    </TouchableOpacity>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="YearListView">
        <Stack.Screen name="YearListView" component={YearListView} options={{ title: 'Choose Year'}}/>
        <Stack.Screen name="MakeListView" component={MakeListView as React.FC<MakeListViewProps>} options={{
           title: 'Choose Make',
           headerLeft: () => <BackArrow />
          }} />
        <Stack.Screen name="ModelListView" component={ModelListView} options={{ 
          title: 'Choose Model',
          headerLeft: () => <BackArrow />
      }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  arrowContainer: {
    marginLeft: 15,
    // Add padding, background, or any additional styling as needed
  },
  arrow: {
    color: 'orange', // Set your arrow color here
  },
});


export default App;
