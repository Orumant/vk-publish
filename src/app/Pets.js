import React, {useState, useEffect} from 'react';
import {
    View,
    Panel,
    PanelHeader,
    Header,
    Div,
    FormLayout,
    Select, List, Cell, Button, platform,IOS, HeaderButton
} from "@vkontakte/vkui";
import Icon24Help from '@vkontakte/icons/dist/24/help';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24Like from '@vkontakte/icons/dist/24/like';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Dog from '../assets/dog.png';
import DogDark from '../assets/dogDark.png';
import CatDark from '../assets/catDark.png';
import Cat from '../assets/cat.png';
import {usePets} from "../hooks/Pets";


export function Pets({go}) {
    const [filter, setFilter] = useState({});
    const [pets, setFilters] = usePets();
    const [pet, setPet] = useState(void 0);
    const [activePanel, setActivePanel] = useState('main');
    const osname = platform();

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

    function handlePetCardOpening(pet) {
        return function () {
            setPet(pet);
            setActivePanel('pet');
        }
    }

    function handlePetCardClosing() {
        console.log('bla');
        setPet(void 0);
        setActivePanel('main');
    }

    return (
        <View activePanel={activePanel} id={'pets'}>
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
                            onClick={handlePetCardOpening(current)}
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
            </Panel>
            <Panel id={'pet'} theme={'white'}>
                <PanelHeader
                    theme={'light'}
                    left={
                        <HeaderButton data-to={'main'}  onClick={go}>
                            {osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
                        </HeaderButton>
                    }
                    addon={
                        <HeaderButton
                            onClick={handlePetCardClosing}
                        >Назад</HeaderButton>
                    }
                >
                    Pet The Pet
                </PanelHeader>
                <Button stretched onClick={handlePetCardClosing}>Back</Button>
                {pet && (
                    <>
                        <Div
                            style={{
                                backgroundImage: `url(${pet.photo})`,
                                width: '100%',
                                height: 300,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />
                        <Header>
                            {pet.name}
                        </Header>
                        <Header level={'secondary'}>
                            {pet.age ? `${pet.age} лет` : 'в рассвете сил'}
                        </Header>
                        <Div>
                            {pet.description}
                        </Div>
                        <Div style={{display: 'flex'}}>
                            <Button stretched>Забрать домой</Button>
                            <Button stretched style={{
                                marginLeft: 8
                            }}>Познакомится</Button>
                        </Div>
                    </>
                )}
            </Panel>
        </View>
    )
}