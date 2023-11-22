import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

export type ModelListViewProps = {
  route: {
    params: {
      year: number;
      make: string;
    };
  };
  navigation: StackNavigationProp<any>;
};

const ModelListView: React.FC<ModelListViewProps> = ({ route, navigation }) => {
  const { year, make } = route.params;
  const [models, setModels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchModels = async () => {
    try {
      const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${make.Make_ID}/modelyear/${year}?format=json`);
      const data = await response.json();
      setModels(data.Results);
    } catch (error) {
      console.error('Error fetching car models:', error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    // Fetch car makes when the component mounts
    fetchModels();
  }, []);

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const handleModelSelection = (model: {}) => {
    Alert.alert(
      'Selected Model',
      `Year: ${year}\nMake: ${make.Make_Name}\nModel: ${model.Model_Name}`,
      [
        {
          text: 'OK',
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
  };

  // Custom function to display a toast-like message
  const showToast = (message: string) => {
    // Replace this with your toast-like component or library usage
    console.log(message); // For demonstration, log message to console
  };


  // Render item for FlatList
  const renderMakeItem = ({ item }: { item: {} }) => {
    return (
      <TouchableOpacity onPress={ () => handleModelSelection(item)}>
        <View style={{ padding: 16 }}>
          <Text>{item.Model_Name.toString()}</Text>
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
          data={models}
          renderItem={renderMakeItem}
          keyExtractor={(item) => item.Model_ID.toString()}
          contentContainerStyle={{ flexGrow: 1 }}
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={<Text style={styles.noText}>No models found</Text>}
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
    justifyContent: 'center',
    padding: 16,
    textAlign: 'center'
  },
  spinner: {
    alignContent: 'center',
    padding: 16,
  },
});

export default ModelListView