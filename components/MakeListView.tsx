import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

export type MakeListViewProps = {
  route: {
    params: {
      year: number;
    };
  };
  navigation: StackNavigationProp<any>;
};

const MakeListView: React.FC<MakeListViewProps> = ({ route, navigation }) => {
  const { year } = route.params;
  const [makes, setMakes] = useState<{}[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Function to fetch car makes based on selected year
  const fetchMakes = async () => {
    try {
      const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json`);
      const data = await response.json();
      setMakes(data.Results);
    } catch (error) {
      console.error('Error fetching car makes:', error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    // Fetch car makes when the component mounts
    fetchMakes();
  }, []);

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  // Render item for FlatList
  const renderMakeItem = ({ item }: { item: {} }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ModelListView', { year: year, make: item })}>
        <View style={{ padding: 16 }}>
          <Text>{item.Make_Name.toString()}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#FF5500" style={styles.spinner}/> 
      ) : (
        <FlatList
          data={makes}
          renderItem={renderMakeItem}
          keyExtractor={(item) => item.Make_ID.toString()}
          contentContainerStyle={{ flexGrow: 1 }}
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={<Text style={styles.noText}>No makes found</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  separator: {
    height: 0.5,
    backgroundColor: 'lightgray',
  },
  noText: {
    justifyContent: 'center'
  },
  spinner: {
    alignContent: 'center',
    padding: 16,
  },
});

export default MakeListView;
