import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import reset from '../../styles/reset';
import fonts from '../../styles/fonts';
import { Ionicons } from '@expo/vector-icons'
import colors from '../../styles/colors';

export const CustomPicker = ({ selectedValue, onValueChange, options }) => {
    
    const [isVisible, setIsVisible] = useState(false);
    const filteredOptions = options.filter(option => option.label !== 'Selecione um ano');

    const handlePress = () => {
        setIsVisible(true);
    };

    const handleOptionSelect = (value) => {
        onValueChange(value);
        setIsVisible(false);
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.picker} onPress={handlePress}>
                <Text style={{fontFamily: fonts.medium, fontSize: 12, color: '#3A3839'}}>Anual</Text>
                <Text style={styles.selectedText}>
                    {selectedValue || 'Selecione um ano'}
                </Text>
                <View>
                    <Ionicons name='calendar-outline' size={18} color={'#001D55'}></Ionicons>
                </View>
            </TouchableOpacity>
            <Modal
                transparent={true}
                visible={isVisible}
                animationType="slide"
                onRequestClose={() => setIsVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <FlatList
                            data={filteredOptions}
                            keyExtractor={(item) => item.value.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => handleOptionSelect(item.value)}
                                >
                                    <Text style={styles.optionText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={() => setIsVisible(false)}>
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        marginTop: reset.padTop
    },
    picker: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        borderRadius: 7,
        alignItems: 'center',
        elevation: 1,
        height: 49,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    selectedText: {
        fontSize: 12,
        color: '#5F5F5F',
        fontFamily: fonts.medium
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 20,
        elevation: 5,
    },
    option: {
        padding: 10,
    },
    optionText: {
        textAlign: 'center',
        color: '#5F5F5F',
        fontFamily: fonts.medium
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: colors.brighterBlue,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: fonts.medium,
        fontSize: 12
    },
});
