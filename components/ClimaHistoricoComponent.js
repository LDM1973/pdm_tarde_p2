import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearProgress } from '@rneui/base'

const ClimaHistoricoComponent = () => {

    const [state, setState] = useState({
        clima: []
    })

    const updateList = async () => {
        setState({clima: (await climaService.obterLista()).data.items})
    }
    
    useEffect(() => {
        const go = async () => {
            await updateList()
        }
        go()
    }, [])

    return (
        <View>
            {
                clima.length > 0 ?
                <>
                    <FlatList
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                        renderItem={(clima) => (
                        <ListItem bottomDivider>
                        <ListItem.Content>
                        <ListItem.Title>{clima.item.cidade}</ListItem.Title>
                        <ListItem.Subtitle>{clima.item.data_previsao}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                        </ListItem>
                        )}
                        data={clima}
                    />
                </>
                    :
                    <LinearProgress />
            }
        </View>
    )
}

export default ClimaHistoricoComponent

const styles = StyleSheet.create({})