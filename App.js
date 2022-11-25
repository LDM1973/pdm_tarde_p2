import { StyleSheet, TextInput, FlatList, Alert, Text, ScrollView, View } from 'react-native';

import React, { useState, useEffect } from "react";
import { Card, Input, Tab, TabView, Button, ListItem} from "@rneui/themed";
import PesquisaClimaTela from "./telas/PesquisaClimaTela";

export default function App() {
    useEffect(() => {
        getHistorico();
    }, []);

    const [index, setIndex] = useState(0);

    const capturarTexto = (cidadeDigitada) => {
        setCidade(cidadeDigitada);
    };
    const [cidade, setCidade] = useState("");
    const [cidadeEscolhida, setCidadeEscolhida] = useState(null);
    const [historico, setHistorico] = useState([]);
    
    const getCidade = (cidade) => {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&APPID=fe1d134bae594b6a9e1bdbabb5f242c2&units=metric&lang=pt`;

        fetch(url)
            .then((resposta) => resposta.json())
            .then((json) => {
            const model = {
                cidade: json.name,
                temperaturaMaxima: json.main.temp_max,
                temperaturaMinima: json.main.temp_min,
                descricao: json.weather[0].description,
                icone: json.weather[0].icon,
                data: new Date(),
            };
            setCidadeEscolhida(model);
            criarHistorico(model);
        })
        .catch(() => {
            Alert.alert("Erro", "Não foi possivel carregar os dados dessa cidade");
        }).finally();
    };


    const criarHistorico = (model) => {
        const mes = model.data.getMonth() + 1;
        const request = {
            cidade: model.cidade,
            data_historico: model.data.getDate() + "/" + mes + "/" + model.data.getFullYear(),
        };

        const url ="https://g3e99fc358a3389-jp1k665t7zehy4vs.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/fatec_ipi_20222_pdm_tarde_historico_previsoes/";

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        body: JSON.stringify(request),
        })
        .then((data) => {
            getHistorico();
        });
    };


  const getHistorico = () => {
    const url =
      "https://g3e99fc358a3389-jp1k665t7zehy4vs.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/fatec_ipi_20222_pdm_tarde_historico_previsoes/";

    fetch(url)
      .then((resposta) => resposta.json())
      .then((json) => {
        if (json.items.length > 0) {
          setHistorico(json.items.reverse());
        }
      });
  };





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
        <TabView value={index} onChange={setIndex} animationType="timing">
        <TabView.Item style={styles.tabView}>
            <View style={{padding: 5}}>
            <Card containerStyle={styles.card}>
                <Input 
                    placeholder='Ex.: Itu'
                    rightIcon={{type: 'font-awesome', name: 'search'}}
                    style={styles.textInput}
                    onChangeText={capturarTexto}
                    value={cidade}
                />
                <Button 
                    title='Pesquisar'
                    type='solid'
                    buttonStyle={styles.button}
                    onPress={() => getCidade(cidade)}
                />
            </Card>
            {
                cidadeEscolhida && <PesquisaClimaTela cidade={cidadeEscolhida} />
            }
            </View>
        </TabView.Item>
        <TabView.Item>
            <FlatList

            data={historico}
            keyExtractor={(item) => item.cod_historico}
            renderItem={({ item }) => (
                
                <ListItem containerStyle={styles.listItemContainer}>
                <ListItem.Content  >
                    <Text style={styles.text}>

                    <Text style={styles.data}>{item.data_historico}</Text>
                    <Text style={styles.cidade}>{item.cidade}</Text>
                    </Text>
                </ListItem.Content>
                </ListItem>
            )}
            />
        </TabView.Item>
        </TabView>
    </>
    );
}


const styles = StyleSheet.create({
    card: {
        margin: 5,
        padding: 5,
        borderRadius: 5
    },
    textInput: {
        padding: 5
    },
    button: {
        borderRadius: 5,
        backgroundColor: 'black',
        margin: 5
    },
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
    },
})