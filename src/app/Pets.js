import React, {useState, useEffect} from 'react';
import {
    View,
    Panel,
    PanelHeader,
    Header,
    Div,
    FormLayout,
    Select, List, Cell,
    Avatar,
} from "@vkontakte/vkui";
import Icon24Help from '@vkontakte/icons/dist/24/help';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24Like from '@vkontakte/icons/dist/24/like';
import Dog from '../assets/dog.png';
import DogDark from '../assets/dogDark.png';
import CatDark from '../assets/catDark.png';
import Cat from '../assets/cat.png';
import {usePets} from "../hooks/Pets";

export function Pets({go, id}) {
    const [city, setCity] = useState('');
    const [filter, setFilter] = useState({});
    const [pets, setFilters] = usePets();

    useEffect(() => {
        setFilters(filter);
    }, [filter]);

    function handleGenusChange(value) {
        return function () {
            if ((filter.genus === 'cat' || filter.genus === 'dog') && value === filter.genus) {
                let {genus, ...newFilter} = filter;
                setFilter(newFilter);
            } else
                setFilter({...filter, genus: value});
        }
    }

    return (
        <View activePanel={'pets'} id={'pets'} header={'test'}>
            <Panel id={id} theme={'white'}>
                <PanelHeader theme={'light'} noShadow>
                    Pet The Pet
                </PanelHeader>
                <Header
                    level={'secondary'}
                    aside={<Icon24Help/>}
                >Питомцы</Header>
                <FormLayout>
                    <Select value={city}
                            onChange={({target: {value}}) => setCity(value)}
                            top={'Город'}
                            placeholder={'Не выбран'}>
                        <option value={'Санкт-Петербург'}>Санкт-Петербург</option>
                    </Select>
                </FormLayout>
                <Div style={{display: 'inline-flex'}}>
                    <Div
                        style={{display: 'flex', width: 60, flexWrap: 'wrap'}}
                    >
                        <div style={{
                            height: 60,
                            flexBasis: '100%',
                            width: 60,
                            cursor: 'pointer',
                            backgroundColor: filter.genus === 'dog' ? 'rgb(29,9,98)' : '#fff',
                            borderRadius: 8,
                            backgroundImage: filter.genus === 'dog' ? `url(${Dog})` : `url(${DogDark})`,
                            backgroundSize: '50px 50px',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                        }}
                             onClick={handleGenusChange('dog')}
                        />
                        <div>Собаки</div>
                    </Div>
                    <Div
                        style={{display: 'flex', justifyContent: 'center', width: 60, flexWrap: 'wrap'}}
                    >
                        <div style={{
                            height: 60,
                            flexBasis: '100%',
                            width: 60,
                            cursor: 'pointer',
                            backgroundColor: filter.genus === 'cat' ? 'rgb(29,9,98)' : '#fff',
                            borderRadius: 8,
                            backgroundImage: filter.genus === 'cat' ? `url(${Cat})` : `url(${CatDark})`,
                            backgroundSize: '50px 50px',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                        }}
                             onClick={handleGenusChange('cat')}/>
                        <div>Кошки</div>
                    </Div>
                </Div>
                <List style={{width: '100%'}}>
                    {pets.map(pet => (
                        <Cell
                            size={'l'}
                            asideContent={
                                <Icon24Like
                                    style={{color: pet.sex ? 'rgb(174,221,240)' : '#F2D0E5'}}
                                />
                            }
                            description={
                                <div style={{display: 'flex', width: '100%', flexWrap: 'wrap'}}>
                                    <Div
                                        style={{flexBasis: '98%', marginLeft: 4}}
                                    >{pet.age ? pet.age : 'В рассвете сил'}</Div>
                                    <Div style={{display: 'flex', alignContent: 'center'}}>
                                        <Icon24Place height={16} width={16}/>
                                        <span>{pet.shelterName}</span>
                                    </Div>
                                </div>
                            }
                            before={<div style={{
                                height: 130,
                                width: 130,
                                borderRadius: 16,
                                marginRight: 16,
                                backgroundImage: `url(${pet.photo})`,
                                backgroundSize: '250px 130px',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center'

                            }}/>}
                        >{pet.name}</Cell>
                    ))}
                </List>
            </Panel>
        </View>
    )
}