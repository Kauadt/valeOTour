import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { CustomPicker } from '../CustomPicker';
import api from '../../services/api';
import { useIsFocused } from '@react-navigation/native';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';

const DadosProps = {
    guiaID: null,
};

export const Graphic = ({ guiaID } = DadosProps) => {
    const [graphicData, setGraphicData] = useState([]);
    const [data, setData] = useState({ labels: [], values: [] });
    const [anoSelecionado, setAnoSelecionado] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mostrarGrafico, setMostrarGrafico] = useState(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (guiaID) {
            listGraphicData();
        } else {
            console.error("guiaID não definido");
        }
    }, [isFocused]);

    async function listGraphicData() {
        setLoading(true);
        try {
            const res = await api.get(`valeOTour/guias/listar_dados_grafico.php?id=${guiaID}`);
            setGraphicData(res.data.result);
        } catch (error) {
            console.log("Erro ao Listar: ", error);
        } finally {
            setLoading(false);
        }
    }

    const mesesDoAno = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const traducaoMeses = {
        January: 'Janeiro',
        February: 'Fevereiro',
        March: 'Março',
        April: 'Abril',
        May: 'Maio',
        June: 'Junho',
        July: 'Julho',
        August: 'Agosto',
        September: 'Setembro',
        October: 'Outubro',
        November: 'Novembro',
        December: 'Dezembro',
    };

    const atualizarDados = (ano) => {
        const agendamentosFiltrados = graphicData && graphicData.filter(item => item.year === ano);

        const mesesCompletos = mesesDoAno.map(mes => ({
            mes_nome: mes,
            countScheduling: 0,
        }));

        agendamentosFiltrados.forEach(agendamento => {
            const mesIndex = mesesCompletos.findIndex(mesItem => mesItem.mes_nome === traducaoMeses[agendamento.month]);
            if (mesIndex !== -1) {
                mesesCompletos[mesIndex].countScheduling = parseInt(agendamento.countScheduling) || 0;
            }
        });

        setData({
            labels: mesesCompletos.map(item => item.mes_nome),
            values: mesesCompletos.map(item => item.countScheduling),
        });
    };

    const handleAnoChange = (ano) => {
        setAnoSelecionado(ano);
        if (ano !== "Selecione um ano" && ano) {
            setMostrarGrafico(true);
            atualizarDados(ano);
        } else {
            setMostrarGrafico(false);
            setData({ labels: [], values: [] });
        }
    };

    const maxValue = Math.max(...data.values, 0);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>

                    {mostrarGrafico && data.values.length > 0 && (
                        <View style={styles.chartContainer}>
                            {data.labels.map((label, index) => (
                                <View key={index} style={styles.row}>
                                    <Text style={styles.label}>{label}</Text>
                                    <View style={styles.barContainer}>
                                        <View
                                            style={{
                                                height: 20,
                                                backgroundColor: colors.brighterBlue,
                                                width: `${(data.values[index] / maxValue) * 100}%`,
                                                maxWidth: '100%',
                                                borderRadius: 7
                                            }}
                                        />
                                    </View>
                                    <Text style={styles.value}>{data.values[index]}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    <CustomPicker
                        selectedValue={anoSelecionado || 'Selecione um ano'}
                        onValueChange={handleAnoChange}
                        options={[
                            { label: 'Selecione um ano', value: 'Selecione um ano' },
                            ...(
                                Array.isArray(graphicData)
                                    ? Array.from(new Set(graphicData.map(item => item.year)))
                                        .sort((a, b) => b - a)
                                        .map(ano => ({ label: `${ano}`, value: ano }))
                                    : []
                            )
                        ]}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    chartContainer: {
        paddingTop: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    barContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    label: {
        color: '#7B7B7B',
        fontSize: 13,
        fontFamily: fonts.medium,
        textAlign: 'left',
        width: '22%',
    },
    value: {
        color: '#7B7B7B',
        fontSize: 13,
        fontFamily: fonts.medium,
        textAlign: 'right',
        width: '22%',
    },
});

export default Graphic;
