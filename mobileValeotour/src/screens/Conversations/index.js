import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, RefreshControl, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import api from '../../services/api';
import { styles } from './style';
import url from '../../services/url';
import Header from '../../components/Header';
import { Ionicons } from '@expo/vector-icons'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import { usePubNub } from "pubnub-react";

const Conversations = () => {
    const [loggedUser, setLoggedUser] = useState(null);
    const [channels, setChannels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userChatData, setUserChatData] = useState([])
    const [otherUserIds, setOtherUserIds] = useState([]);
    const [combinedData, setCombinedData] = useState([]);
    const [lastMessages, setLastMessages] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    const isFocused = useIsFocused();
    const navigation = useNavigation()
    const pubnub = usePubNub();

    const fetchLoggedUser = async () => {
        try {
            const userID = await AsyncStorage.getItem('@user');
            setLoggedUser(userID);
        } catch (error) {
            console.log('Erro ao recuperar o ID do usuário logado:', error);
        }
    };

    const loadChannels = async () => {
        try {
            let res = await api.get(`valeOTour/chat/listar_id.php?id=${loggedUser}`);

            if (res.data.success && Array.isArray(res.data.result)) {
                let channels = res.data.result || [];
                setChannels(channels);
            } else {
                setChannels([]);
            }
        } catch (error) {
            console.error('Erro ao carregar canais:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const listUserChatData = async () => {
        try {
            setIsLoading(true);
            const requests = otherUserIds.map(id =>
                api.get(`valeOTour/chat/listar_user_chat_data.php?id=${id}`)
            );

            const responses = await Promise.all(requests);
            const userChatData = responses.flatMap(response => response.data.result || []);
            setUserChatData(userChatData);
        } catch (error) {
            console.error('Error loading user chat data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const extractOtherUserIds = (channels) => {
        const userId = Number(loggedUser);

        const otherUsers = channels
            .map(channel => {
                if (!channel?.channelName || typeof channel.channelName !== 'string') {
                    console.warn('Invalid channel name:', channel);
                    return null;
                }

                const channelParts = channel.channelName.split('_');
                const userIds = channelParts.slice(1).map(Number);

                return userIds.find(id => id !== userId);
            })
            .filter(Boolean);

        setOtherUserIds(otherUsers);
    };

    const combineChannelUserData = () => {
        const combined = channels.map((channel, index) => {
            const otherUserId = otherUserIds[index];
            const user = userChatData.find(user => Number(user.userID) === otherUserId);

            return {
                ...channel,
                ...user
            };
        });
        setCombinedData(combined);
    };

    useEffect(() => {
        setFilteredData(combinedData);
    }, [combinedData]);

    useEffect(() => {
        if (userChatData.length > 0 && channels.length > 0 && otherUserIds.length > 0) {
            combineChannelUserData();
        }
    }, [userChatData, channels, otherUserIds]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchLoggedUser();
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (loggedUser) {
            loadChannels();
            setIsLoading(false);
        }
    }, [loggedUser]);
    

    useEffect(() => {
        if (otherUserIds.length > 0) {
            listUserChatData();
        }
    }, [otherUserIds]);

    const handleChannelPress = async (channelName, image, name, type, id) => {
        await AsyncStorage.setItem('@channelName', channelName);
        if (image) {
            await AsyncStorage.setItem('@userChatImage', image);
        } else {
            await AsyncStorage.setItem('@userChatImage', 'none');
        }
        await AsyncStorage.setItem('@userChatName', name);
        await AsyncStorage.setItem('@userChatType', type);
        await AsyncStorage.setItem('@userChatID', id);

        navigation.navigate('Chat');
    };

    useEffect(() => {
        if (Array.isArray(channels) && channels.length > 0) {
            extractOtherUserIds(channels);

            channels.forEach(channelObj => {
                if (channelObj?.channelName) {
                    const channelName = channelObj.channelName;
                    getLastMessage(channelName);
                }
            });
        }
    }, [channels, isFocused]);


    const getLastMessage = async (channel) => {
        try {
            const response = await pubnub.history({
                channel: channel,
                count: 1
            });

            if (response.messages.length > 0) {
                const ultimaMensagem = response.messages[0].entry;
                const autorId = ultimaMensagem.author;
                const mensagem = ultimaMensagem.content;

                setLastMessages(prevMessages => ({
                    ...prevMessages,
                    [channel]: {
                        content: mensagem,
                        authorId: autorId
                    }
                }));
            } else {
                setLastMessages(prevMessages => ({
                    ...prevMessages,
                    [channel]: {
                        content: 'Nenhuma mensagem',
                        authorId: null
                    }
                }));
            }
        } catch (error) {
            console.log(`Erro ao recuperar a última mensagem do canal ${channel}:`, error);
            setLastMessages(prevMessages => ({
                ...prevMessages,
                [channel]: {
                    content: 'Erro ao carregar',
                    authorId: null
                }
            }));
        }

        setRefreshing(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
        if (Array.isArray(channels) && channels.length > 0) {
            extractOtherUserIds(channels);

            channels.forEach(channelObj => {
                if (channelObj?.channelName) {
                    const channelName = channelObj.channelName;
                    getLastMessage(channelName);
                }
            });
        }

    };

    const renderItem = ({ item }) => {
        const lastMessage = lastMessages[item.channelName] || { content: 'Carregando...', authorId: null };
        const isUserLogged = lastMessage.authorId === loggedUser;

        return (
            <TouchableOpacity style={styles.cardMessage} onPress={() => handleChannelPress(item.channelName, item.imagePath, item.userName, item.userType, item.userID)}>
                <View style={styles.userMessageIcon}>
                    {
                        item.imagePath ? (<Image source={{ uri: `${url}valeOTour/usuarios/assets/${item.imagePath}`}} style={styles.userMessageIconImg}></Image>) :
                            (<Ionicons name="person" color={colors.white} size={30}></Ionicons>)
                    }
                </View>

                <View style={styles.cardMessageContent}>
                    <Text style={styles.cardMessageUserName}>{item.userName}</Text>

                    <Text style={styles.cardMessagePreview}>
                        {isUserLogged ? lastMessage.content : `${item.userName}: ${lastMessage.content}`}
                    </Text>
                </View>

                <View style={styles.cardMessageUnread}>
                    {/* <Text style={styles.cardMessageUnreadText}>1</Text>           */}
                </View>
            </TouchableOpacity>
        );
    };


    const [searchText, setSearchText] = useState(''); 
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const updateFilteredData = () => {
            if (searchText === '') {
                setFilteredData(combinedData);
            } else {
                const filtered = combinedData.filter(item => 
                    item.userName.toLowerCase().includes(searchText.toLowerCase())
                );
                setFilteredData(filtered); 
            }
        };
    
        updateFilteredData();
    }, [searchText, combinedData]);
    


    useEffect(() => {
        if (isFocused) {
            loadChannels();
        }
    }, [isFocused]);

    
   
    
    

    return (
        <View style={styles.container}>

            <View style={styles.containerHeader}>
                <View style={{ paddingHorizontal: 24 }}>
                    <Header title='Conversas' hasScdIcon={false} mainIcon='chatbubble-outline' isButton={false}></Header>

                    <View style={styles.containerSearch}>
                        <View style={styles.containerInputSearch}>
                            <Ionicons name='search-outline' color={colors.lightBlue} size={20}></Ionicons>
                            <TextInput 
                            style={styles.inputSearch} 
                            placeholder='Pesquisar conversas' 
                            placeholderTextColor={colors.lightBlue} 
                            onChangeText={(value) => setSearchText(value)}
                            value={searchText}
                            ></TextInput>
                        </View>
                    </View>

                </View>
                <View style={styles.headerAreaBottom}></View>
            </View>


            <FlatList
                data={filteredData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
                ListEmptyComponent={() => (
                    <Text style={{ color: colors.lightGray, fontSize: 12, fontFamily: fonts.medium, marginTop: 20, marginHorizontal: 24 }}>Inicie uma nova conversa</Text>
                )}
            />

        </View>
    );
};


export default Conversations;
