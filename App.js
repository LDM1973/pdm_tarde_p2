import React from 'react'
import { StyleSheet } from 'react-native';
import ClimaHistoricoTela from './telas/ClimaHistoricoTela';
import ClimaPesquisaTela from './telas/ClimaPesquisaTela';
import { Tab, TabView } from '@rneui/themed'

export default function App() {
    
    const [index, setIndex] = React.useState(0);

    return (
        <>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={styles.tab}
            >
            <Tab.Item
                title="Pesquisar"
                titleStyle={styles.tabItem}
            />
            <Tab.Item
                title="Historico"
                titleStyle={styles.tabItem}
            />
            </Tab>
            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={styles.tabView}>
                    <ClimaPesquisaTela />
                </TabView.Item>
                <TabView.Item style={styles.tabView}>
                    <ClimaHistoricoTela />
                </TabView.Item>
            </TabView>
        </>
    );
}

const styles = StyleSheet.create({
    tab: {
        backgroundColor: 'black',
        height: 3,
    },
    tabItem: {
        fontSize: 20,
        color: 'black'
    },
    tabView: {
      width: '100%'
    }
})