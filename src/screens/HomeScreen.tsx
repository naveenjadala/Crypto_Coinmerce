import { NavigationProp, useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

import CryptoCard from '../components/CryptoCard';
import CustomFlatList from '../components/CustomFlatList';
import { ErrorCard } from '../components/ErrorCard';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useGetCoinsQuery } from '../services/cryptoApi';
import { useTheme } from '../theme/ThemeProvider';
import { Crypto } from '../types';

/**
 * HomeScreen component displays a list of cryptocurrencies with search and refresh functionality.
 *
 * Features:
 * - Fetches cryptocurrency data using `useGetCoinsQuery`.
 * - Allows users to search for specific cryptocurrencies using a search bar.
 * - Provides pull-to-refresh functionality to reload data.
 * - Navigates to the Detail screen when a cryptocurrency is selected.
 *
 * State:
 * - `filteredData`: Array of cryptocurrencies to be displayed, filtered based on search input.
 * - `refreshing`: Boolean indicating if the list is currently refreshing.
 *
 * Effects:
 * - Updates `filteredData` when new data is fetched.
 *
 * Callback Functions:
 * - `onRefresh`: Refreshes the data by calling `refetch`.
 * - `handleSearch`: Filters the cryptocurrency list based on the search query.
 * - `handlePress`: Navigates to the Detail screen with the selected cryptocurrency's details.
 * - `keyExtractor`: Extracts a unique key for each cryptocurrency item.
 * - `renderItem`: Renders each cryptocurrency item as a `CryptoCard`.
 *
 * Error Handling:
 * - Displays an error message with retry option if data fetching fails.
 *
 * Loading State:
 * - Displays a loading text while data is being fetched.
 */

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { data, isLoading, error, refetch } = useGetCoinsQuery();
  const { isDarkMode, toggleTheme } = useTheme();

  const [filteredData, setFilteredData] = useState<Crypto[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const debouncedSearch = React.useMemo(
    () =>
      debounce((text: string) => {
        if (!data) return;

        if (text.trim() === '') {
          setFilteredData(data);
        } else {
          setFilteredData(
            data.filter(item =>
              item.name.toLowerCase().includes(text.toLowerCase()),
            ),
          );
        }
      }, 500),
    [data],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearch = useCallback(
    (text: string) => {
      debouncedSearch(text);
    },
    [debouncedSearch],
  );

  const handlePress = useCallback(
    (item: Crypto) => {
      navigation.navigate('Detail', { id: item.id, name: item.name });
    },
    [navigation],
  );

  const keyExtractor = useCallback((item: Crypto) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: Crypto }) => (
      <CryptoCard item={item} onPress={handlePress} />
    ),
    [handlePress],
  );

  const changeTheme = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <ErrorCard error={error} onRetry={refetch} />;

  return (
    <Container>
      <Header
        title={'Crypto App'}
        isThemeToggle
        toggleTheme={changeTheme}
        mode={isDarkMode}
      />
      <SearchBar onChangeText={handleSearch} placeholder="Search Crypto" />
      <View>
        <CustomFlatList
          data={filteredData}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
    </Container>
  );
};

export default HomeScreen;

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;
