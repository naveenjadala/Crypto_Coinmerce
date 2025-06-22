import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useGetCoinChartQuery } from '../services/cryptoApi';
import { useTheme } from '../theme/ThemeProvider';

const { width, height } = Dimensions.get('screen');

/**
 * DetailScreen component displays a chart of a specific cryptocurrency's price
 * over the last 15 days.
 *
 * It fetches the chart data using the `useGetCoinChartQuery` hook and displays the
 * chart using the `LineChart` component.
 *
 * It also provides a refresh button to refetch the chart data.
 *
 * Features:
 * - Displays a chart of the cryptocurrency's price over the last 15 days.
 * - Provides a refresh button to refetch the chart data.
 * - Displays a tooltip with the price value when a data point is tapped.
 *
 * Props:
 * - `params.id`: The ID of the cryptocurrency to display the chart for.
 */
const DetailScreen = () => {
  const { theme } = useTheme();
  const { params } = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
  const navigation = useNavigation();

  const days = 15;

  const { data, isLoading, error, refetch } = useGetCoinChartQuery({
    id: params.id,
    days: days,
  });

  const chartData = React.useMemo(() => {
    if (!data || !data.prices) return null;
    const dataPoints = data.prices.map(price => price[1]);

    const labels = data?.prices.map(([timestamp], index) => {
      if (index % 5 === 0) {
        const date = new Date(timestamp);
        return `${date.getDate()} ${date.toLocaleString('default', {
          month: 'short',
        })}`;
      }
      return '';
    });
    return {
      labels: labels,
      datasets: [
        {
          data: dataPoints,
          color: (opacity = 1) => `rgba(0, 192, 118, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
  }, [data]);

  const chartConfig = {
    backgroundGradientFrom: theme.colors.background,
    backgroundGradientTo: theme.colors.background,
    backgroundGradientFromOpacity: 1,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) =>
      `${theme.colors.text}${Math.floor(opacity * 255).toString(16)}`,
    strokeWidth: 2,
    decimalPlaces: 1,
    fromZero: true,
    useShadowColorFromDataset: true,
    propsForLabels: {
      fontSize: 10,
      fill: theme.colors.text,
    },
    propsForDots: {
      r: '2',
      strokeWidth: '2',
      stroke: theme.colors.profit,
      fill: theme.colors.profit,
    },
    propsForBackgroundLines: {
      stroke: theme.colors.divider,
    },
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const refetchData = () => {
    refetch();
  };

  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });

  const setToolTipPoints = React.useCallback(
    ({ x, y, value }: { x: number; y: number; value: number }) =>
      setTooltipPos(prev => ({
        x,
        y,
        visible: prev.x !== x || prev.y !== y ? true : !prev.visible,
        value,
      })),
    [setTooltipPos],
  );

  return (
    <Container>
      <Header title={params?.name} isBackButton backPressed={handleBack} />
      <TopContainer>
        <Days>15 Days</Days>
        <TouchableOpacity onPress={refetchData}>
          <Icon name="refresh" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </TopContainer>

      <ChartContainer>
        {isLoading && <Loader size="large" color={theme.colors.text} />}
        {error && <ErrorText>Error loading chart data</ErrorText>}
        {!isLoading && !error && chartData && (
          <LineChart
            data={chartData}
            width={width}
            height={height * 0.9}
            chartConfig={chartConfig}
            bezier
            style={chartSty}
            onDataPointClick={setToolTipPoints}
          />
        )}
        {tooltipPos.visible && (
          <ToolTipContainer tooltipPos={{ x: tooltipPos.x, y: tooltipPos.y }}>
            <ToolTipValue>{tooltipPos.value.toFixed(2)}</ToolTipValue>
          </ToolTipContainer>
        )}
      </ChartContainer>
    </Container>
  );
};

export default DetailScreen;

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ChartContainer = styled.View`
  flex: 1;
`;

const TopContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const Days = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.card};
  padding: 4px 8px;
  border-radius: 8px;
`;

const ErrorText = styled.Text`
  flex: 1;
  text-align: center;
  margin-top: 20px;
  color: red;
`;

const ToolTipContainer = styled.View<{ tooltipPos: { x: number; y: number } }>`
  position: absolute;
  left: ${({ tooltipPos }) => tooltipPos.x}px;
  top: ${({ tooltipPos }) => tooltipPos.y - 20}px;
  background-color: ${({ theme }) => theme.colors.card};
  padding: 5px;
  border-radius: 4px;
`;

const ToolTipValue = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.base}px;
`;

const chartSty = {
  marginVertical: 12,
};
