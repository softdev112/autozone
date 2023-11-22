import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

export type YearListViewProps = {
  navigation: StackNavigationProp<any>;
};

const YearListView: React.FC<YearListViewProps> = ({ navigation }) => {

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 1995;
    const years = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push(year.toString());
    }
    return years;
  };

  // Data for the FlatList
  const yearsList = generateYears();

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  // Render item for FlatList
  const renderYearItem = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('MakeListView', { year: item })}>
        <View style={{ padding: 16 }}>
          <Text>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={yearsList}
      renderItem={renderYearItem}
      keyExtractor={(item) => item}
      ItemSeparatorComponent={renderSeparator}
      contentContainerStyle={{ flexGrow: 1 }}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  separator: {
    height: 0.5,
    backgroundColor: 'lightgray',
  },
});

export default YearListView;
