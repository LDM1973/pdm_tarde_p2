import { StyleSheet, View } from 'react-native'
import React from 'react'
import ClimaHistoricoComponent from '../components/ClimaHistoricoComponent'
import {
    Card
} from '@rneui/themed'

import * as climaService from '../service/ClimaService'
import { FlatList } from 'react-native-web'

const ClimaHistoricoTela = () => {

    return (
        <View>
            <FlatList>
                
            </FlatList>
        </View>
    )
}

export default ClimaHistoricoTela

const styles = StyleSheet.create({})