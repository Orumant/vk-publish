import React, {useState, useEffect} from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import {Pets} from './app/Pets';
import {
    Button,
    Cell,
    Div,
    Epic,
    FormLayout,
    Header, HeaderButton, IOS,
    List,
    Panel,
    PanelHeader,
    platform,
    Select,
    Tabbar,
    TabbarItem
} from "@vkontakte/vkui";
import PawBlack from './assets/pawBlack.png';
import Paw from './assets/paw.png';
import shelter from './assets/shelter.png';
import shelterBlack from './assets/shelterBlack.png';
import Icon24Help from '@vkontakte/icons/dist/24/help';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24Like from '@vkontakte/icons/dist/24/like';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Dog from './assets/dog.png';
import DogDark from './assets/dogDark.png';
import CatDark from './assets/catDark.png';
import Cat from './assets/cat.png';
import {usePets} from "./hooks/Pets";


const App = () => {
    const [activeStory, setActiveStory] = useState('pets');
    const [filter, setFilter] = useState({});
    const [page, setPage] = useState(0);
    const [pets, setFilters] = usePets(page, 20);
    const [pet, setPet] = useState(void 0);
    const [activePanel, setActivePanel] = useState('main');
    const osname = platform();

    useEffect(() => {
        setFilters(filter);
    }, [filter]);

    const go = e => {
        setActiveStory(e.currentTarget.dataset.story);
    };

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

    function fetchMore() {
        if (pets.length > 0) {
            let nextPage = page + 1;
            setPage(nextPage);
            setFilter({...filter, page: nextPage})
        } else {
            setPage(0);
            setFilter({...filter, page: 0})
        }
    }

    return (
        <Epic activeStory={activeStory} tabbar={
            <Tabbar>
                <TabbarItem
                    onClick={go}
                    style={{
                        backgroundColor: activeStory === 'pets' ? 'rgb(29,9,98)' : '#fff',
                        color: activeStory === 'pets' ? 'white' : 'inherit'
                    }}
                    selected={activeStory === 'pets'}
                    data-story={'pets'}
                    text={activeStory === 'pets' ? 'Питомцы' : ''}
                >
                    <div style={{
                        width: 32,
                        height: 32,
                        marginRight: 8,
                        backgroundImage: activeStory === 'pets' ? `url(${Paw})` : `url(${PawBlack})`,
                        backgroundSize: '32px 32px',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}/>
                </TabbarItem>
                <TabbarItem
                    onClick={go}
                    style={{
                        backgroundColor: activeStory === 'shelters' ? 'rgb(29,9,98)' : '#fff',
                        color: activeStory === 'shelters' ? 'white' : 'inherit'
                    }}
                    selected={activeStory === 'shelters'}
                    data-story={'shelters'}
                    text={activeStory === 'shelters' ? 'Приюты' : ''}
                >
                    <div style={{
                        width: 32,
                        height: 32,
                        marginRight: 8,
                        backgroundImage: activeStory === 'shelters' ? `url(${shelter})` : `url(${shelterBlack})`,
                        backgroundSize: '32px 32px',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}/>
                </TabbarItem>
            </Tabbar>
        }>
            <View activePanel={activePanel} id={'pets'}>
                <Panel id={'main'} theme={'white'}>
                    <PanelHeader theme={'light'} noShadow>
                        Pet The Pet
                    </PanelHeader>
                    <a id={'top'}/>
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
                                    backgroundSize: '130px 130px',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center'

                                }}/>}
                            >{current.name}</Cell>
                        ))}
                    </List>
                    <Button
                        size="xl"
                        component='a'
                        href={'#top'}
                        level={'secondary'}
                        onClick={fetchMore}
                        style={{margin: '8px 0'}}>{pets.length > 0 ? 'Ещё' : 'В начало'}</Button>
                </Panel>
                <Panel id={'pet'} theme={'white'}>
                    <PanelHeader
                        theme={'light'}
                        left={
                            <HeaderButton data-to={'main'} onClick={handlePetCardClosing}>
                                {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
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
                            <Header aside={<Button component="a" href="#">Помочь</Button>}>
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
                                }}>Познакомиться</Button>
                            </Div>
                        </>
                    )}
                </Panel>
            </View>
        </Epic>

    );
};

export default App;

