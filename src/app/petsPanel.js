import {Cell, Div, FormLayout, Header, List, Panel, PanelHeader, Select} from "@vkontakte/vkui";
import Dog from "../assets/dog.png";
import DogDark from "../assets/dogDark.png";
import Cat from "../assets/cat.png";
import CatDark from "../assets/catDark.png";
import React, {useState, useEffect} from "react";
import {usePets} from "../hooks/Pets";
import Icon24Help from '@vkontakte/icons/dist/24/help';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24Like from '@vkontakte/icons/dist/24/like';

export function PetsPanel() {
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

    function handleCityChange({target: {value}}) {
        if (value != null) {
            setFilter({...filter, city: value})
        } else {
            let {city, ...newFilter} = filter;
            setFilter(newFilter);
        }

    }

    return (
        <Panel id={'main'} theme={'white'}>
            <PanelHeader theme={'light'} noShadow>
                Pet The Pet
            </PanelHeader>
            <Header
                level={'secondary'}
                aside={<Icon24Help/>}
            >Питомцы</Header>
            <FormLayout>
                <Select value={filter.city}
                        onChange={handleCityChange}
                        top={'Город'}
                        placeholder={'Не выбран'}>
                    <option value={'Санкт-Петербург'}>Санкт-Петербург</option>
                    <option value={'Москва'}>Москва</option>
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
                {pets.map(current => (
                    <Cell
                        size={'l'}
                        // onClick={handlePetCardOpening(current)}
                        asideContent={
                            <Icon24Like
                                style={{color: current.sex ? 'rgb(174,221,240)' : '#F2D0E5'}}
                            />
                        }
                        description={
                            <div style={{display: 'flex', width: '100%', flexWrap: 'wrap'}}>
                                <Div
                                    style={{flexBasis: '98%', marginLeft: 4}}
                                >{current.age ? `${current.age} лет` : 'В рассвете сил'}</Div>
                                <Div style={{display: 'flex', alignContent: 'center'}}>
                                    <Icon24Place height={16} width={16}/>
                                    <span>{current.shelterName}</span>
                                </Div>
                            </div>
                        }
                        before={<div style={{
                            height: 130,
                            width: 130,
                            borderRadius: 16,
                            marginRight: 16,
                            backgroundImage: `url(${current.photo})`,
                            backgroundSize: '250px 130px',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'

                        }}/>}
                    >{current.name}</Cell>
                ))}
            </List>
        </Panel>)
}