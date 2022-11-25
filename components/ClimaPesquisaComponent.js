import { FlatList, StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import {
    Card,
    Button,
    Input,
    ListItem
} from '@rneui/themed'
import * as climaService from '../service/ClimaService'
import { API_KEY} from '@env'

const ClimaPesquisaComponent = () => {

    const [cidade, setCidade] = useState('')
    const [clima, setClima] = useState([])
    const [bdClima, setBdClima] = useState([]);
    const [mensagem, setMensagem] = useState('')

    const capturaTexto = (textoInput) => {
        setCidade(textoInput)
    }

    const obterClima = () => {
        console.log(cidade)
        const url = encodeURI(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&APPID=0bf938e2e5e491fd9be9d4cedb9b32db&units=metric&lang=pt`)
        fetch(url)
        .then (response => response.json())
        .then(dados => {
            setClima(dados?.weather)
            addClima(dados?.weather)
        })
    }

    const addClima = async (listaClima) => {
        try{
            console.log(clima?.weather[0])
            if(listaClima){
                
              return listaClima.map(async (clima) => {
                const res = await climaService.cadastrarClima({cidade: cidade, data: new Date(), link: 'https://openweathermap.org/img/wn/' + clima.weather[0].icon + '.png'})
                setMensagem('Previsão cadastrada com sucesso')
                setInterval(() => {setMensagem()}, 2500)
              });
            }else{
              setMensagem();
            }
        }
        catch(erro){
            console.log('erro', erro)
            setMensagem('Falha. Tente novamente mais tarde')
            setInterval(() => {setMensagem()}, 2500)
        }
    }

    const getClima = async() =>{
        const allClima = await climaService.cadastrarClima();
        setBdClima(allClima.data.items);
      }
    
      const obterAddClima = () =>{
        obterClima();
        addClima();
      }

    return (
    <View style={{padding: 5}}>
        <Card containerStyle={styles.card}>
            <Input 
                placeholder='Ex.: Itu'
                rightIcon={{type: 'font-awesome', name: 'search'}}
                style={styles.textInput}
                onChangeText={capturaTexto}
                value={cidade}
            />
            <Button 
                title='Pesquisar'
                type='solid'
                buttonStyle={styles.button}
                onPress={obterAddClima}
            />
        </Card>
        <View
            style={{alignItems: 'center'}}>
            <FlatList 
            data={bdClima}
            renderItem={
                p => (
                <ListItem>
                    <Avatar rounded source={{ uri: 'https://openweathermap.org/img/wn/' + icon + '.png' }}/>
                    <ListItem.Content>
                        <ListItem.Title>Temp</ListItem.Title>
                        <ListItem.Subtitle>Max: {temp_max + '\u00B0C'}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Content>
                        <ListItem.Title>Temp</ListItem.Title>
                        <ListItem.Subtitle>Min: {temp_min + '\u00B0C'}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                )
            }
            />
        </View>
    </View>
    )
}

export default ClimaPesquisaComponent

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
    }
})