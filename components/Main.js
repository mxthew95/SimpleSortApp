import React, { useEffect } from 'react'
import {
    View,
    ActivityIndicator,
    FlatList,
    useWindowDimensions

} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { getApiData } from '../src/redux/reducers/apiDataReducer'
import Item from './Item'

const Main = () => {
    const { height } = useWindowDimensions()
    const dispatch = useDispatch()
    const { apiData } = useSelector((state) => state.apiData)

    const renderItem = ({ item }) => {
        return <Item amount={item.amount} createdAt={item.createdAt} updatedAt={item.updatedAt} id={item.id} />
    }

    useEffect(() => {
        dispatch(getApiData())
    }, [dispatch])

    if (apiData.length) {
        return (
            <View style={{ alignItems: 'center', height: height - 100, marginBottom: 10 }}>
                <FlatList
                    data={apiData}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                />
            </View>

        )
    }

    return <ActivityIndicator size="large" color="#5e5e5e" />
}


export default Main