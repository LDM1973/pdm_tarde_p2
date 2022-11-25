import { Text, StyleSheet, View } from "react-native";
import React from "react";
import {
    Card,
} from '@rneui/themed'

export default function PesquisaClimaTela ({ cidade }) {

  const currentMonth = cidade.data.getMonth() + 1;

  return (
    <Card style={styles.card}>
            <Text style={styles.textStyle}>
            {
                cidade.data.getDate() +
                "/" +
                currentMonth +
                "/" +
                cidade.data.getFullYear() +
                " " +
                cidade.data.getHours() +
                ":" +
                cidade.data.getMinutes()
            }
            </Text>
            <Card.Divider />
            <View
                style={styles.container}>
                <View>
                    <img style={{ with: 140, height: 140 }} src={"http://openweathermap.org/img/wn/" + cidade.icone + "@2x.png"} />
                    <Text style={styles.textStyle}>{cidade.descricao}</Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                    <Text style={styles.textStyle}>Temp. Max: {Math.round(cidade.temperaturaMaxima, 1)} °C</Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                    <Text style={styles.textStyle}>Temp. Min: {Math.round(cidade.temperaturaMinima)} °C</Text>
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: 5,
        padding: 5,
        borderRadius: 5
    },
    textStyle: {
        fontSize: 20
    },
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        marginTop: 10,padding: 0
    }
})